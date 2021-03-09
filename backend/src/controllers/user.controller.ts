import {Controller, Delete, Get, Post, Put} from "@overnightjs/core";
import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import argon2 from "argon2";
import {JWTConfigure} from "../middlewares/JWTConfigure";
import geo_from_ip from "geoip-lite";
import {Role} from "../types/role.type";
import jwt from "jsonwebtoken";


@Controller("api")
export class UserController {
  // TODO: Обновить класс JWT до обычного использования метода валидация,
  //  в метод проходит токен, клиент и название метода класса

  // Система получает рекомендации,
  // которые включают в себя нужные доп. обследования и вакцинации от болезни,
  // которая была найдена во время обследования.
  // Также с этим всем у юзера отобразиться уведомление об результате иследования и
  // рекомендации к лечению, если требуется

  clientDB: PrismaClient = new PrismaClient();
  jwtConfigure: JWTConfigure = new JWTConfigure();

  @Get("recommend")
  private async recommendToUser(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB)))
      return res.status(401).send("401 Unauthorized");

    try {
      const userResults = (await this.clientDB.resultSurvey.findMany({
        where: {user: {some: {login: ""}}}, include: {survey: true}
      }))
      const surveys = (await this.clientDB.supplierServices.findMany()).filter(i => {
        userResults.filter(i1 => {
          const regex = new RegExp(i1.survey[0].name, 'i');
          if (i.type === "TYPE_SURVEY" && regex.test(i.name)) {
            return i;
          }
        });
      });
      const vaccines = (await this.clientDB.supplierServices.findMany()).filter(i => {
        userResults.filter(i1 => {
          const regex = new RegExp(i1.survey[0].name, 'i');
          if (i.type === "TYPE_VACCINE" && regex.test(i.name)) {
            return i;
          }
        });
      });

      return res.status(200).json({
        user: await this.clientDB.user.findUnique({where: {login: ""}}),
        surveys: surveys,
        vaccines: vaccines
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error getting recommend | " + e
      });
    }
  }

  @Get("user")
  private async getCurrentUser(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB)))
      return res.status(401).send("401 Unauthorized");

    const token = req.headers.authorization.split(" ")[1];

    const sd = await this.clientDB.user.findMany({
      where: {auths: {some: {token: token}}},
      select: {
        id: true,
        fullName: true,
        login: true,
        email: true,
        phone: true,
        auths: true,
        services: true,
        caps: true
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(400).json({
        msg: "Error getting current user | " + e
      });
    });
  }

  @Get("users")
  private async getAll(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN])))
        return res.status(401).send("401 Unauthorized");

      // include: {services: true, auths: true},
      await this.clientDB.user.findMany({
        select: {
          id: true,
          fullName: true,
          login: true,
          email: true,
          phone: true,
          auths: true,
          services: true,
          caps: true
        }
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
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN])))
        return res.status(401).send("401 Unauthorized");

      const id = parseInt(req.params.id);
      await this.clientDB.user.findMany({
        where: {id: id},
        select: {
          id: true,
          fullName: true,
          login: true,
          email: true,
          phone: true,
          services: true,
          caps: true
        }
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
      const {login, pwd, isRememberMe, device, ip} = req.body;
      await this.clientDB.user.findUnique({
        where: {login: login}
      }).then(async user => {
        const verifyPwd = await argon2.verify(user.pwd, pwd);
        if (!verifyPwd) {
          return res.status(400).json({
            msg: "Password is invalid!"
          });
        }
        await this.clientDB.token.findUnique({
          where: {ip}
        }).then(token => {
          return res.status(200).json({
            user: user, token: token.token
          })
        }).catch(async () => {
          const newJWToken = this.jwtConfigure.generateJWT(user, isRememberMe);

          const geoInfo = geo_from_ip.lookup(ip);
          let location = `${geoInfo.country}, ${geoInfo.city}`;

          await this.clientDB.token.create({
            data: {
              typeDevice: device,
              token: newJWToken,
              ip: ip,
              location: location
            }
          }).catch(e => {
            return res.status(400).json({
              msg: "Error creating token | " + e
            });
          });

          await this.clientDB.user.update({
            where: {login: login},
            data: {
              auths: {
                connect: {
                  ip: ip
                }
              }
            }
          }).catch(e => {
            return res.status(400).json({
              msg: "Error connecting token with user | " + e
            });
          });

          return res.status(200).json({
            user: user, token: newJWToken
          });
        });
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

  @Post("logout")
  private async logout(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB)))
        return res.status(401).send("401 Unauthorized");

      const {ip} = req.body;

      await this.clientDB.token.delete({
        where: {ip: ip}
      }).then(() => {
        return res.status(200).json({
          msg: "User is sign-out"
        });
      }).catch(e => {
        return res.status(400).json({
          msg: "Error deleting token | " + e
        });
      });
    } catch (e) {
      return res.status(400).json({
        msg: "Error logout. " + e
      })
    }
  }

  @Put("user/:id")
  private async editUserById(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_PARTNER])))
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
            pwd: await argon2.hash(pwd)
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

  @Put("user")
  private async editCurrentUser(req: Request, res: Response) {
    if (!(await this.jwtConfigure.validateToken(req, this.clientDB)))
      return res.status(401).send("401 Unauthorized");

    const nativeLogin: any = jwt.decode(req.headers.authorization.split(" ")[1]);

    const {login, pwd, fullName, email, phone} = req.body;

    await this.clientDB.user.update({
      where: {login: nativeLogin["data"].login},
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
        msg: "Error editing current user | " + e
      });
    });
  }

  @Delete("user/:id")
  private async deleteUserById(req: Request, res: Response) {
    try {
      if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN])))
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
