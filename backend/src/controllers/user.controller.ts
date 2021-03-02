import {Controller, Delete, Get, Post, Put} from "@overnightjs/core";
import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import argon2 from "argon2";
import {JWTConfigure} from "../middlewares/JWTConfigure";


@Controller("api")
export class UserController {

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("users")
  private async getAll(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
        return res.status(401).send("401 Unauthorized");

      await this.clientDB.user.findMany({
        include: {services: true}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error getting users | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Get("users/:id")
  private async getById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);

      if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      await this.clientDB.user.findMany({
        where: {id: id}, include: {services: true}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: `Error getting user by id ${id} | ERROR: ` + e
        });
      })
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Post("register")
  private async registerNewUser(req: Request, res: Response) {
    try {
      const {login, pwd, fullName, email, phone} = req.body;
      await this.clientDB.user.create({
        data: {
          login: login,
          pwd: await argon2.hash(pwd),
          fullName: fullName,
          email: email,
          phone: phone
        }
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: "Error creating user | ERROR: " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Post("login")
  private async login(req: Request, res: Response) {
    try {
      const {login, pwd, isRemember, device} = req.body;
      await this.clientDB.user.findUnique({
        where: {login: login}
      }).then(async resp => {
        const verifyPwd = await argon2.verify(resp.pwd, pwd);
        if (!verifyPwd) {
          return res.status(400).json({
            msg: "Password is invalid!"
          });
        }

        const newJWToken = this.jwtConfigure.generateJWT(resp, isRemember !== undefined);

        await this.clientDB.token.create({
          data: {
            typeDevice: device,
            token: newJWToken
          }
        });

        await this.clientDB.user.update({
          where: {login: login},
          data: {
            auths: {
              connect: {
                token: newJWToken
              }
            }
          }
        })

        return res.status(200).json({
          user: resp, token: newJWToken
        })
      }).catch(e => {
        return res.status(400).json({
          msg: `User not found | ERROR: ${e}`
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Put("users/:id")
  private async editUserById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);
      if (!verifyToken.tokenVerified)
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      const {login, pwd, fullName, email, phone, services} = req.body;

      if (login !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            login
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing login field by id ${id} | ERROR: ` + e
          })
        });
      }
      if (pwd !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            pwd: pwd
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing pwd field by id ${id} | ERROR:  ` + e
          })
        });
      }
      if (fullName !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            fullName: fullName
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing fullName field by id ${id} | ERROR:  ` + e
          })
        });
      }
      if (email !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            email: email
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing email field by id ${id} | ERROR:  ` + e
          })
        });
      }
      if (phone !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            phone: phone
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing phone field by id ${id} | ERROR:  ` + e
          })
        });
      }
      if (email !== undefined) {
        await this.clientDB.user.update({
          where: {id: id},
          data: {
            email: email
          }
        }).catch(e => {
          return res.status(400).json({
            msg: `Error editing email field by id ${id} | ERROR:  ` + e
          })
        });
      }
      if (services !== undefined) {
        for (let name of services) {
          await this.clientDB.user.update({
            where: {id: id},
            data: {
              services: {
                connect: {
                  name: name
                }
              }
            }
          }).catch(e => {
            return res.status(400).json({
              msg: `Error editing services field by id ${id} | ERROR:  ` + e
            })
          })
        }
      }

      await this.clientDB.user.findUnique({
        where: {id: id}, include: {services: true}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: `Error getting edited user by id ${id} | ` + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }

  @Delete("users/:id")
  private async deleteUserById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.clientDB);
      if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      await this.clientDB.user.delete({
        where: {id: id}
      }).then(resp => {
        return res.status(200).json(resp);
      }).catch(e => {
        return res.status(400).json({
          msg: `Error deleting user by id ${id} | ERROR: ` + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error processing request ! ERROR: " + e
      });
    }
  }
}