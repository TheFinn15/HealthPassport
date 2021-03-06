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
let UserController = class UserController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getCurrentUser(req, res) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
        if (!verifyToken.tokenVerified)
            return res.status(401).send("401 Unauthorized");
        await this.clientDB.user.findMany({
            where: { auths: { every: { token: token } } }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting current user | " + e
            });
        });
    }
    async getAll(req, res) {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
            if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
                return res.status(401).send("401 Unauthorized");
            await this.clientDB.user.findMany({
                include: { services: true, auths: true }
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
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
            if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            await this.clientDB.user.findMany({
                where: { id: id }, include: { services: true }
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
            const { login, pwd, fullName, email, phone } = req.body;
            await this.clientDB.user.create({
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
                    where: { ip }
                }).then(token => {
                    console.log(token);
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
                            location: location
                        }
                    }).catch(e => {
                        return res.status(400).json({
                            msg: "Error creating token | " + e
                        });
                    });
                    await this.clientDB.user.update({
                        where: { login: login },
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
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async logout(req, res) {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
            if (!verifyToken.tokenVerified)
                return res.status(401).send("401 Unauthorized");
            const { ip } = req.body;
            // const token = req.headers.authorization.split(" ")[1];
            // const {data: {id, login}} = this.jwtConfigure.decodeToken(token) as {data: any};
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
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
            if (!verifyToken.tokenVerified)
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            const { login, pwd, fullName, email, phone, services } = req.body;
            if (login !== undefined) {
                await this.clientDB.user.update({
                    where: { id: id },
                    data: {
                        login
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
                        pwd: pwd
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
                for (let name of services) {
                    await this.clientDB.user.update({
                        where: { id: id },
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
                        });
                    });
                }
            }
            await this.clientDB.user.findUnique({
                where: { id: id }, include: { services: true }
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
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
        if (!verifyToken.tokenVerified)
            return res.status(401).send("401 Unauthorized");
        const { login, pwd, fullName, email, phone } = req.body;
        await this.clientDB.user.update({
            where: { login: verifyToken.decoded.data.login },
            data: {
                login: login,
                pwd: pwd,
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
    async deleteUserById(req, res) {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const verifyToken = await this.jwtConfigure.validateUserToken(token, this.clientDB);
            if (!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN")
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
    core_1.Put("users/:id"),
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