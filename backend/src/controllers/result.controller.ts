import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {PrismaClient} from "@prisma/client";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import {Request, Response} from "express";
import {Role} from "../types/role.type";


@Controller("api")
export class ResultController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("results")
  private async getResults(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    await this.clientDB.resultSurvey.findMany({
      include: {user: true, survey: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting results | " + e
      });
    });
  }

  @Get("result/:id")
  private async getResultById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_USER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;

    await this.clientDB.resultSurvey.findMany({
      where: {id: parseInt(id)},
      include: {user: true, survey: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting result " + id + " | " + e
      });
    });
  }

  @Post("result")
  private async createResult(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_PARTNER, Role.ROLE_ADMIN])))
      return res.status(401).send("401 Unauthorized");

    const {user, survey, info} = req.body;

    await this.clientDB.resultSurvey.create({
      data: {
        user: {
          connect: {
            login: user
          }
        },
        survey: {
          connect: {
            id: survey
          }
        },
        info: info
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error creating result | " + e
      });
    });
  }

  @Put("result/:id")
  private async editResultById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;
    const {user, survey, info, readyTime} = req.body;

    if (user !== undefined)
      await this.clientDB.resultSurvey.update({
        where: {id: parseInt(id)},
        data: {
          user: {
            connect: {
              login: user
            }
          }
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit result field %user% by id " + id + " | " + e
        });
      });
    if (survey !== undefined)
      await this.clientDB.resultSurvey.update({
        where: {id: parseInt(id)},
        data: {
          survey: {
            connect: {

            }
          }
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit result field %survey% by id " + id + " | " + e
        });
      });
    if (readyTime !== undefined)
      await this.clientDB.resultSurvey.update({
        where: {id: parseInt(id)},
        data: {
          readyTime: readyTime
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit result field %readyTime% by id " + id + " | " + e
        });
      });
    if (info !== undefined)
      await this.clientDB.resultSurvey.update({
        where: {id: parseInt(id)},
        data: {
          info: info
        }
      }).catch(e => {
        return res.status(400).json({
          msg: "Error edit result field %info% by id " + id + " | " + e
        });
      });

    await this.clientDB.resultSurvey.findUnique({
      where: {id: parseInt(id)}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting edited user " + id + " | " + e
      });
    });
  }

  @Delete("result/:id")
  private async deleteResultById(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
      return res.status(401).send("401 Unauthorized");

    const {id} = req.params;

    await this.clientDB.resultSurvey.delete({
      where: {id: parseInt(id)}
    }).then(() => {
      return res.status(200).json(`Result ${id} deleted`);
    }).catch(e => {
      return res.status(400).json({
        msg: `Error delete result ${id} | ${e}`
      });
    });
  }
}
