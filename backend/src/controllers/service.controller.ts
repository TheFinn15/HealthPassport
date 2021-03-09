import {PrismaClient} from "@prisma/client";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {Request, Response} from "express";

@Controller("api/service")
export class ServiceController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get()
  private async getAllService(req: Request, res: Response) {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && (verifyToken.role !== "ROLE_ADMIN" || verifyToken.role !== "ROLE_USER"))
        return res.status(401).send("401 Unauthorized");
      await this.clientDB.supplierServices.findMany({
        include: {partner: true}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting services | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Get(":id")
  private async getServiceById(req: Request, res: Response) {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && (verifyToken.role !== "ROLE_ADMIN" || verifyToken.role !== "ROLE_USER"))
        return res.status(401).send("401 Unauthorized");

      const {id} = req.params;
      await this.clientDB.supplierServices.findUnique({
        where: {id: parseInt(id)}, include: {partner: true}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting service by id " + id + " | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Post()
  private async createService(req: Request, res: Response) {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && (verifyToken.role !== "ROLE_ADMIN" || verifyToken.role !== "ROLE_PARTNER"))
        return res.status(401).send("401 Unauthorized");

      const {name, type, info, partner} = req.body;
      await this.clientDB.supplierServices.create({
        data: {
          name: name,
          type: type,
          info: info,
          partnerId: partner
        }
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error creating new service ! | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Put(":id")
  private async editServiceById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && (verifyToken.role !== "ROLE_ADMIN" || verifyToken.role !== "ROLE_PARTNER"))
        return res.status(401).send("401 Unauthorized");

      const {name, type, result, info, partner} = req.body;
      const {id} = req.params;

      if (name !== undefined) {
        await this.clientDB.supplierServices.update({
          where: {id: parseInt(id)},
          data: {
            name: name
          }
        }).catch(e => {
          return res.status(400).json({
            msg: "Error editing %name% field by id " + id + " | ERROR: " + e
          })
        });
      }
      if (type !== undefined) {
        await this.clientDB.supplierServices.update({
          where: {id: parseInt(id)},
          data: {
            type: type
          }
        }).catch(e => {
          return res.status(400).json({
            msg: "Error editing %type% field by id " + id + " | ERROR: " + e
          })
        });
      }
      if (result !== undefined) {
        await this.clientDB.supplierServices.update({
          where: {id: parseInt(id)},
          data: {
            resultsSurvey: {
              connect: {
                id: result
              }
            }
          }
        }).catch(e => {
          return res.status(400).json({
            msg: "Error editing %result% field by id " + id + " | ERROR: " + e
          })
        });
      }
      if (info !== undefined) {
        await this.clientDB.supplierServices.update({
          where: {id: parseInt(id)},
          data: {
            info: info
          }
        }).catch(e => {
          return res.status(400).json({
            msg: "Error editing %info% field by id " + id + " | ERROR: " + e
          })
        });
      }
      if (partner !== undefined) {
        await this.clientDB.supplierServices.update({
          where: {id: parseInt(id)},
          data: {
            partnerId: partner
          }
        }).catch(e => {
          return res.status(400).json({
            msg: "Error editing %partner% field by id " + id + " | ERROR: " + e
          })
        });
      }

      await this.clientDB.supplierServices.findUnique({
        where: {id: parseInt(id)}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting edited service by id " + id + " | ERROR: " + e
        })
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Delete(":id")
  private async deleteServiceById(req: Request, res: Response) {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && (verifyToken.role !== "ROLE_ADMIN" || verifyToken.role !== "ROLE_PARTNER"))
        return res.status(401).send("401 Unauthorized");

      const {id} = req.params;

      await this.clientDB.supplierServices.delete({
        where: {id: parseInt(id)}
      }).then(() => {
        return res.status(200).send("Service was deleted");
      }).catch(e => {
        return res.status(400).json({
          msg: "Error deleting service by id " + id + " | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }
}
