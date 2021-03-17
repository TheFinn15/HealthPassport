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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultController = void 0;
const core_1 = require("@overnightjs/core");
const client_1 = require("@prisma/client");
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const role_type_1 = require("../types/role.type");
let ResultController = class ResultController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getResults(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        await this.clientDB.resultSurvey.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        login: true,
                        email: true,
                        phone: true,
                        role: true
                    }
                },
                survey: true
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting results | " + e
            });
        });
    }
    async getResultById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        await this.clientDB.resultSurvey.findMany({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        login: true,
                        email: true,
                        phone: true,
                        role: true
                    }
                },
                survey: true
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting result " + id + " | " + e
            });
        });
    }
    async createResult(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_PARTNER, role_type_1.Role.ROLE_ADMIN])))
            return res.status(401).send("401 Unauthorized");
        const { user, survey, info } = req.body;
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
    async editResultById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        const { user, survey, info, readyTime } = req.body;
        if (user !== undefined)
            await this.clientDB.resultSurvey.update({
                where: { id: parseInt(id) },
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
                where: { id: parseInt(id) },
                data: {
                    survey: {
                        connect: {}
                    }
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error edit result field %survey% by id " + id + " | " + e
                });
            });
        if (readyTime !== undefined)
            await this.clientDB.resultSurvey.update({
                where: { id: parseInt(id) },
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
                where: { id: parseInt(id) },
                data: {
                    info: info
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error edit result field %info% by id " + id + " | " + e
                });
            });
        await this.clientDB.resultSurvey.findUnique({
            where: { id: parseInt(id) }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting edited user " + id + " | " + e
            });
        });
    }
    async deleteResultById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        await this.clientDB.resultSurvey.delete({
            where: { id: parseInt(id) }
        }).then(() => {
            return res.status(200).json(`Result ${id} deleted`);
        }).catch(e => {
            return res.status(400).json({
                msg: `Error delete result ${id} | ${e}`
            });
        });
    }
};
__decorate([
    core_1.Get("results"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getResults", null);
__decorate([
    core_1.Get("result/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getResultById", null);
__decorate([
    core_1.Post("result"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "createResult", null);
__decorate([
    core_1.Put("result/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "editResultById", null);
__decorate([
    core_1.Delete("result/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "deleteResultById", null);
ResultController = __decorate([
    core_1.Controller("api")
], ResultController);
exports.ResultController = ResultController;
//# sourceMappingURL=result.controller.js.map