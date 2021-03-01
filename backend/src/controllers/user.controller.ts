import {Controller, Delete, Get, Post, Put} from "@overnightjs/core";
import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import argon2 from "argon2";
import {JWTConfigure} from "../middlewares/JWTConfigure";


@Controller("api")
export class UserController {

  userClient: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("users")
  private async getAll(req: Request, res: Response) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.userClient);
    if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN") return res.status(401).send("401 Unauthorized");

    await this.userClient.user.findMany({
      include: {ills: true, survey: true, vaccines: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: "Error getting users \n " + e
      });
    });
  }

  @Get("users/:id")
  private async getById(req: Request, res: Response) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.userClient);
    if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN") return res.status(401).send("401 Unauthorized");

    const id = parseInt(req.params.id);
    await this.userClient.user.findMany({
      where: {id: id}, include: {ills: true, survey: true, vaccines: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error getting user by id ${id} \n ` + e
      });
    })
  }

  @Post("register")
  private async registerNewUser(req: Request, res: Response) {

    const {login, pwd, fullName, email, phone} = req.body;
    await this.userClient.user.create({
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
      return res.status(404).json({
        msg: "Error creating user \n " + e
      });
    });
  }

  @Post("login")
  private async login(req: Request, res: Response) {

    const {login, pwd, isRemember} = req.body;
    await this.userClient.user.findUnique({
      where: {login: login}
    }).then(async resp => {
      const verifyPwd = await argon2.verify(resp.pwd, pwd);
      if (!verifyPwd) {
        return res.status(404).json({
          msg: "Password is invalid!"
        });
      }

      return res.status(200).json({
        user: resp, token: this.jwtConfigure.generateJWT(resp, isRemember !== undefined)
      })
    }).catch(e => {
      return res.status(404).json({
        msg: `User not found \n ${e}`
      });
    });
  }

  @Put("users/:id")
  private async editUserById(req: Request, res: Response) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.userClient);
    if (!verifyToken.tokenVerified) return res.status(401).send("401 Unauthorized");

    const id = parseInt(req.params.id);
    const {login, pwd, fullName, email, phone, ill, vaccine, survey} = req.body;

    if (login !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          login
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing login field by id ${id}` + e
        })
      });
    }
    if (pwd !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          pwd: pwd
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing pwd field by id ${id}` + e
        })
      });
    }
    if (fullName !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          fullName: fullName
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing fullName field by id ${id}` + e
        })
      });
    }
    if (email !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          email: email
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing email field by id ${id}` + e
        })
      });
    }
    if (phone !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          phone: phone
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing phone field by id ${id}` + e
        })
      });
    }
    if (email !== undefined) {
      await this.userClient.user.update({
        where: {id: id},
        data: {
          email: email
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error editing email field by id ${id}` + e
        })
      });
    }
    if (ill !== undefined) {
      for (let name of ill) {
        await this.userClient.user.update({
          where: {id: id},
          data: {
            ills: {
              connect: {
                name: name
              }
            }
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error editing ill field by id ${id}` + e
          })
        })
      }
    }
    if (vaccine !== undefined) {
      for (let name of vaccine) {
        await this.userClient.user.update({
          where: {id: id},
          data: {
            vaccines: {
              connect: {
                name: name
              }
            }
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error editing vaccine field by id ${id}` + e
          })
        });
      }
    }
    if (survey !== undefined) {
      for (let name of survey) {
        await this.userClient.user.update({
          where: {id: id},
          data: {
            survey: {
              connect: {
                name: name
              }
            }
          }
        }).catch(e => {
          return res.status(404).json({
            msg: `Error editing survey field by id ${id}` + e
          })
        });
      }
    }

    await this.userClient.user.findUnique({
      where: {id: id}, include: {ills: true, survey: true, vaccines: true}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error editing user by id ${id} \n ` + e
      });
    });
  }

  @Delete("users/:id")
  private async deleteUserById(req: Request, res: Response) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken: any = await this.jwtConfigure.validateUserToken(token, this.userClient);
    if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN") return res.status(401).send("401 Unauthorized");

    const id = parseInt(req.params.id);
    await this.userClient.user.delete({
      where: {id: id}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error deleting user by id ${id} \n ` + e
      });
    });
  }

}