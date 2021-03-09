import {PrismaClient} from "@prisma/client";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Controller, Delete, Get, Post, Put} from "@overnightjs/core";
import {Request, Response} from "express";
import {Role} from "../types/role.type";

@Controller("api")
export class CapabilityController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("caps")
  private async getCaps(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    await this.clientDB.userCapability.findMany({
      include: {user: true}
    })
      .then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting caps | " + e
        });
      });
  }

  @Get("cap/:id")
  private async getCapById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;

    await this.clientDB.userCapability.findUnique({
      where: {id: parseInt(id)}, include: {user: true}
    }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting cap by id " + id + " | " + e
        });
      });
  }

  @Post("caps")
  private async createCapability(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {name, info} = req.body;

    await this.clientDB.userCapability.create({
      data: {
        name: name,
        info: info
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error creating cap | " + e
      });
    });
  }

  @Put("cap/:id")
  private async editCapById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;
    const {name, info, user} = req.body;

    if (name !== undefined)
      await this.clientDB.userCapability.update({
        where: {id: parseInt(id)},
        data: {
          name: name
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit field name | " + e
        });
      });
    if (info !== undefined)
      await this.clientDB.userCapability.update({
        where: {id: parseInt(id)},
        data: {
          info: info
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit field info | " + e
        });
      });
    if (user !== undefined)
      await this.clientDB.userCapability.update({
        where: {id: parseInt(id)},
        data: {
         user: user
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit field user | " + e
        });
      });
    // if (result !== undefined)
    //   await this.clientDB.userCapability.update({
    //     where: {id: parseInt(id)},
    //     data: {
    //       resultSurveyId: result
    //     }
    //   }).catch(e => {
    //     return res.status(400).json({
    //       msg: "Error edit field user | " + e
    //     });
    //   });

    await this.clientDB.userCapability.findUnique({
      where: {id: parseInt(id)}, include: {user: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error get edited cap | " + e
      });
    });
  }

  @Delete("cap/:id")
  private async delCapById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;

    await this.clientDB.userCapability.delete({
      where: {id: parseInt(id)}
    }).then(() => {
      return res.status(200).json({
        isDelete: true
      });
    }).catch(e => {
      return res.status(400).json({
        isDelete: false,
        msg: "Error delete cap by id " + id + " | " + e
      });
    });
  }
}
