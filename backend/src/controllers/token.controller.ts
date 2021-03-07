import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {PrismaClient} from "@prisma/client";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Request, Response} from "express";
import geo_from_ip from "geoip-lite";


@Controller("api")
export class TokenController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("tokens")
  private async getTokens(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);

    if (!(!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN"))
      return res.status(401).send("401 Unauthorized");

    await this.clientDB.token.findMany({
      include: {users: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting tokens | " + e
      });
    });
  }

  @Get(":id")
  private async getTokenById(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);

    if (!(!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN"))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;

    await this.clientDB.token.findUnique({
      where: {id: parseInt(id)}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting token by id " + id + " | " + e
      });
    });
  }

  @Put("token")
  private async editTokenById(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);

    if (!verifyToken.tokenVerified)
      return res.status(401).send("401 Unauthorized");

    const {ip} = req.body;

    const geoInfo = geo_from_ip.lookup(ip);
    let location = `${geoInfo.country}, ${geoInfo.city}`;

    const curToken = await this.clientDB.token.findMany({
      where: {token: token}
    });
    await this.clientDB.token.update({
      where: {id: curToken[0].id},
      data: {
        ip: ip,
        lastOnlineTime: new Date().toISOString(),
        location: location
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error edit token | " + e
      });
    });
  }
}
