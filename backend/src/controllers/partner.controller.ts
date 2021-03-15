import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Role} from "../types/role.type";



@Controller("api")
export class PartnerController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("partners")
  private async getAll(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
        return res.status(401).send("401 Unauthorized");

      await this.clientDB.partner.findMany()
        .then(resp => {
          return res.status(200).json(resp);
        })
        .catch(e => {
          return res.status(404).json({
            msg: `Error getting all partner | ERROR: ${e}`
          });
        });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Get("partner/:id")
  private async getPartnerById(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      await this.clientDB.partner.findUnique({
        where: {id: id}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(404).json({
          msg: `Error getting partner by id ${id} | ERROR: ${e}`
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Post("partner")
  private async createPartner(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
        return res.status(401).send("401 Unauthorized");

      const {name, timeWork, url, about} = req.body;
      await this.clientDB.partner.create({
        data: {
          name: name,
          timeWork: timeWork,
          url: url,
          about: about
        }
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(404).json({
          msg: `Error creating user | ERROR: ${e}`
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Put("partner/:id")
  private async editPartnerById(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      const {name, timeWork, url, about} = req.body;

      if (name !== undefined) {
        await this.clientDB.partner.update({
          where: {id: id},
          data: {
            name: name
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error edit %name% field by id ${id} | ERROR: ${e}`
          })
        });
      }
      if (timeWork !== undefined) {
        await this.clientDB.partner.update({
          where: {id: id},
          data: {
            timeWork: timeWork
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error edit %timeWork% field by id ${id} | ERROR: ${e}`
          })
        });
      }
      if (url !== undefined) {
        await this.clientDB.partner.update({
          where: {id: id},
          data: {
            url: url
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error edit %url% field by id ${id} | ERROR: ${e}`
          })
        });
      }
      if (about !== undefined) {
        await this.clientDB.partner.update({
          where: {id: id},
          data: {
            about: about
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error edit %about% field by id ${id} | ERROR: ${e}`
          })
        });
      }

      await this.clientDB.partner.findUnique({
        where: {id: id}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(404).json({
          msg: `Unexpected error in edit partner method | ERROR: ${e}`
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Delete("partner/:id")
  private async delete(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);

      await this.clientDB.partner.delete({
        where: {id: id}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(404).json({
          msg: `Error deleting partner by id ${id} | ERROR: ${e}`
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }
}
