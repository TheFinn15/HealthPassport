import {PrismaClient} from "@prisma/client";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {Request, Response} from "express";

@Controller("api")
export class CapabilityController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("caps")
  private async getCaps(req: Request, res: Response) {
    await this.clientDB.userCapability.findMany()
      .then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting caps | " + e
        });
      });
  }

  @Get(":id")
  private async getCapById(req: Request, res: Response) {
    const {id} = req.params;

    await this.clientDB.userCapability.findUnique({
      where: {id: parseInt(id)}
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
    const {name, info, ill} = req.body;

    await this.clientDB.userCapability.create({
      data: {
        name: name,
        info: info,
        ill: {
          connect: {
            id: ill
          }
        }
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error creating cap | " + e
      });
    });
  }

  @Put(":id")
  private async editCapById(req: Request, res: Response) {
    const {id} = req.params;
    const {name, info, ill, user} = req.body;

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
    if (ill !== undefined)
      await this.clientDB.userCapability.update({
        where: {id: parseInt(id)},
        data: {
          ill: {
            connect: {
              id: ill
            }
          }
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit field name | " + e
        });
      });
    if (user !== undefined)
      await this.clientDB.userCapability.update({
        where: {id: parseInt(id)},
        data: {
          User: user
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit field user | " + e
        });
      });

    await this.clientDB.userCapability.findUnique({
      where: {id: parseInt(id)}, include: {ill: true, User: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error get edited cap | " + e
      });
    });
  }

  @Delete(":id")
  private async delCapById(req: Request, res: Response) {
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
