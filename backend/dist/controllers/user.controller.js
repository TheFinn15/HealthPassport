"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const core_1 = require("@overnightjs/core");
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const role_type_1 = require("../types/role.type");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserController = class UserController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async recommendToUser(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER])))
            return res.status(401).send("401 Unauthorized");
        const nativeLogin = jsonwebtoken_1.default.decode(req.headers.authorization.split(" ")[1]);
        try {
            const userResults = (await this.clientDB.resultSurvey.findMany({
                where: { user: { login: nativeLogin["data"].login } }, include: { survey: true }
            }));
            const resultsMappedSurveyName = userResults.map(i => i.survey.name);
            const resultsMappedPartnerId = userResults.map(i => i.survey.partnerId);
            const uniqueSurveys = (await this.clientDB.supplierServices.findMany({
                include: {
                    partner: true
                },
                where: {
                    NOT: {
                        partnerId: {
                            in: resultsMappedPartnerId
                        }
                    },
                    AND: {
                        name: {
                            in: resultsMappedSurveyName
                        },
                        type: "TYPE_SURVEY"
                    }
                }
            }));
            const uniqueVaccines = (await this.clientDB.supplierServices.findMany({
                include: {
                    partner: true
                },
                where: {
                    // name: {
                    //   in: resultsMappedSurveyName
                    // },
                    type: "TYPE_VACCINE"
                }
            }));
            return res.status(200).json({
                user: await this.clientDB.user.findUnique({
                    where: { login: nativeLogin["data"].login },
                    select: {
                        id: true,
                        fullName: true,
                        login: true,
                        email: true,
                        phone: true,
                        role: true,
                    }
                }),
                surveys: uniqueSurveys,
                vaccines: uniqueVaccines
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error getting recommend | " + e
            });
        }
    }
    async getCurrentUser(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const token = req.headers.authorization.split(" ")[1];
        await this.clientDB.user.findMany({
            where: { auths: { some: { token: token } } },
            select: {
                id: true,
                fullName: true,
                login: true,
                email: true,
                phone: true,
                role: true,
                auths: true,
                services: {
                    include: { partner: true }
                },
                caps: {
                    include: { ill: true }
                }
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting current user | " + e
            });
        });
    }
    async getAll(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN])))
                return res.status(401).send("401 Unauthorized");
            await this.clientDB.user.findMany({
                select: {
                    id: true,
                    fullName: true,
                    login: true,
                    email: true,
                    phone: true,
                    role: true,
                    auths: true,
                    services: {
                        include: {
                            partner: true
                        }
                    },
                    caps: true
                }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error getting users | ERROR: " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async getById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            await this.clientDB.user.findMany({
                where: { id: id },
                select: {
                    id: true,
                    fullName: true,
                    login: true,
                    email: true,
                    phone: true,
                    role: true,
                    services: true,
                    caps: true
                }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error getting user by id ${id} | ERROR: ` + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async registerNewUser(req, res) {
        try {
            const { login, pwd, fullName, email, phone, role } = req.body;
            await this.clientDB.user.create({
                data: {
                    login: login,
                    pwd: await argon2_1.default.hash(pwd),
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    role: role === undefined ? "ROLE_USER" : role
                },
                select: {
                    id: true,
                    fullName: true,
                    login: true,
                    email: true,
                    phone: true,
                    role: true,
                    services: {
                        include: {
                            partner: true
                        }
                    },
                    caps: true
                }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error creating user | ERROR: " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async login(req, res) {
        try {
            const { login, pwd, isRememberMe, device, ip } = req.body;
            await this.clientDB.user.findUnique({
                where: { login: login }
            }).then(async (user) => {
                const verifyPwd = await argon2_1.default.verify(user.pwd, pwd);
                if (!verifyPwd) {
                    return res.status(400).json({
                        msg: "Password is invalid!"
                    });
                }
                await this.clientDB.token.findUnique({
                    where: {
                        ip: ip
                    }
                }).then(token => {
                    delete user.pwd;
                    return res.status(200).json({
                        user: user, token: token.token
                    });
                }).catch(async () => {
                    const newJWToken = this.jwtConfigure.generateJWT(user, isRememberMe);
                    const geoInfo = geoip_lite_1.default.lookup(ip);
                    let location = `${geoInfo.country}, ${geoInfo.city}`;
                    await this.clientDB.token.create({
                        data: {
                            typeDevice: device,
                            token: newJWToken,
                            ip: ip,
                            location: location,
                            userId: user.id
                        }
                    }).catch(e => {
                        return res.status(400).json({
                            msg: "Error creating token | " + e
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
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async logout(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const { ip } = req.body;
            await this.clientDB.token.delete({
                where: { ip: ip }
            }).then(() => {
                return res.status(200).json({
                    msg: "User is sign-out"
                });
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error deleting token | " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error logout. " + e
            });
        }
    }
    async editUserById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            const { login, pwd, fullName, email, phone, services, role } = req.body;
            if (login !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        login: login
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing login field by id ${id} | ERROR: ` + e
                    });
                });
            }
            if (pwd !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        pwd: await argon2_1.default.hash(pwd)
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing pwd field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            if (fullName !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        fullName: fullName
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing fullName field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            if (email !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        email: email
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing email field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            if (phone !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        phone: phone
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing phone field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            if (email !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        email: email
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing email field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            if (services !== undefined) {
                for (let sId of services) {
                    await this.clientDB.user.update({
                        where: { id: id },
                        data: {
                            services: {
                                connect: {
                                    id: sId
                                }
                            }
                        }
                    }).catch(e => {
                        return res.status(400).json({
                            msg: `Error editing services field by id ${id} | ERROR:  ` + e
                        });
                    });
                }
            }
            if (role !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        role: role
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: `Error editing role field by id ${id} | ERROR:  ` + e
                    });
                });
            }
            await this.clientDB.user.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    fullName: true,
                    login: true,
                    email: true,
                    phone: true,
                    role: true,
                    services: true,
                    caps: true
                }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error getting edited user by id ${id} | ` + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async editCurrentUser(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const nativeLogin = jsonwebtoken_1.default.decode(req.headers.authorization.split(" ")[1]);
        const { login, pwd, fullName, email, phone, service } = req.body;
        if (login !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    login: login
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing login field by id ${nativeLogin.data.id} | ERROR: ` + e
                });
            });
        }
        if (pwd !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    pwd: await argon2_1.default.hash(pwd)
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing pwd field by id ${nativeLogin.data.id} | ERROR:  ` + e
                });
            });
        }
        if (fullName !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    fullName: fullName
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing fullName field by id ${nativeLogin.data.id} | ERROR:  ` + e
                });
            });
        }
        if (email !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin["data"].login },
                data: {
                    email: email
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing email field by id ${nativeLogin.data.id} | ERROR:  ` + e
                });
            });
        }
        if (phone !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    phone: phone
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing phone field by id ${nativeLogin.data.id} | ERROR:  ` + e
                });
            });
        }
        if (email !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    email: email
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing email field by id ${nativeLogin.data.id} | ERROR:  ` + e
                });
            });
        }
        if (service !== undefined) {
            await this.clientDB.user.update({
                where: { login: nativeLogin.data.login },
                data: {
                    services: {
                        connect: {
                            id: service
                        }
                    }
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error editing service field by id ${nativeLogin.data.id} | ERROR: ` + e
                });
            });
        }
        await this.clientDB.user.findUnique({
            where: { login: nativeLogin.data.login },
            select: {
                id: true,
                fullName: true,
                login: true,
                email: true,
                phone: true,
                role: true,
                services: {
                    include: {
                        partner: true
                    }
                },
                caps: true
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error editing current user | " + e
            });
        });
    }
    async deleteUserById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            await this.clientDB.user.delete({
                where: { id: id }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: `Error deleting user by id ${id} | ERROR: ` + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
};
__decorate([
    core_1.Get("recommend"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recommendToUser", null);
__decorate([
    core_1.Get("user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    core_1.Get("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    core_1.Get("users/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    core_1.Post("register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerNewUser", null);
__decorate([
    core_1.Post("login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    core_1.Post("logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    core_1.Put("user/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUserById", null);
__decorate([
    core_1.Put("user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editCurrentUser", null);
__decorate([
    core_1.Delete("user/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserById", null);
UserController = __decorate([
    core_1.Controller("api")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map