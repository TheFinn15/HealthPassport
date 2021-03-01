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
let UserController = class UserController {
    constructor() {
        this.userClient = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getAll(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.userClient);
        if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
            return res.status(401).send("401 Unauthorized");
        await this.userClient.user.findMany({
            include: { ills: true, survey: true, vaccines: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(404).json({
                msg: "Error getting users \n " + e
            });
        });
    }
    async getById(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.userClient);
        if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
            return res.status(401).send("401 Unauthorized");
        const id = parseInt(req.params.id);
        await this.userClient.user.findMany({
            where: { id: id }, include: { ills: true, survey: true, vaccines: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(404).json({
                msg: `Error getting user by id ${id} \n ` + e
            });
        });
    }
    async registerNewUser(req, res) {
        const { login, pwd, fullName, email, phone } = req.body;
        await this.userClient.user.create({
            data: {
                login: login,
                pwd: await argon2_1.default.hash(pwd),
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
    async login(req, res) {
        const { login, pwd, isRemember } = req.body;
        await this.userClient.user.findUnique({
            where: { login: login }
        }).then(async (resp) => {
            const verifyPwd = await argon2_1.default.verify(resp.pwd, pwd);
            if (!verifyPwd) {
                return res.status(404).json({
                    msg: "Password is invalid!"
                });
            }
            return res.status(200).json({
                user: resp, token: this.jwtConfigure.generateJWT(resp, isRemember !== undefined)
            });
        }).catch(e => {
            return res.status(404).json({
                msg: `User not found \n ${e}`
            });
        });
    }
    async editUserById(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.userClient);
        if (!verifyToken.tokenVerified)
            return res.status(401).send("401 Unauthorized");
        const id = parseInt(req.params.id);
        const { login, pwd, fullName, email, phone, ill, vaccine, survey } = req.body;
        if (login !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    login
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing login field by id ${id}` + e
                });
            });
        }
        if (pwd !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    pwd: pwd
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing pwd field by id ${id}` + e
                });
            });
        }
        if (fullName !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    fullName: fullName
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing fullName field by id ${id}` + e
                });
            });
        }
        if (email !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    email: email
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing email field by id ${id}` + e
                });
            });
        }
        if (phone !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    phone: phone
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing phone field by id ${id}` + e
                });
            });
        }
        if (email !== undefined) {
            await this.userClient.user.update({
                where: { id: id },
                data: {
                    email: email
                }
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error editing email field by id ${id}` + e
                });
            });
        }
        if (ill !== undefined) {
            for (let name of ill) {
                await this.userClient.user.update({
                    where: { id: id },
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
                    });
                });
            }
        }
        if (vaccine !== undefined) {
            for (let name of vaccine) {
                await this.userClient.user.update({
                    where: { id: id },
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
                    });
                });
            }
        }
        if (survey !== undefined) {
            for (let name of survey) {
                await this.userClient.user.update({
                    where: { id: id },
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
                    });
                });
            }
        }
        await this.userClient.user.findUnique({
            where: { id: id }, include: { ills: true, survey: true, vaccines: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(404).json({
                msg: `Error editing user by id ${id} \n ` + e
            });
        });
    }
    async deleteUserById(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.userClient);
        if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
            return res.status(401).send("401 Unauthorized");
        const id = parseInt(req.params.id);
        await this.userClient.user.delete({
            where: { id: id }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(404).json({
                msg: `Error deleting user by id ${id} \n ` + e
            });
        });
    }
};
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
    core_1.Put("users/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUserById", null);
__decorate([
    core_1.Delete("users/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserById", null);
UserController = __decorate([
    core_1.Controller("api")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map