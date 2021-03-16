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
exports.ServiceController = void 0;
const client_1 = require("@prisma/client");
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const core_1 = require("@overnightjs/core");
const role_type_1 = require("../types/role.type");
let ServiceController = class ServiceController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getAllService(req, res) {
        try {
            // if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [Role.ROLE_ADMIN, Role.ROLE_USER])))
            //   return res.status(401).send("401 Unauthorized");
            await this.clientDB.supplierServices.findMany({
                include: { partner: true }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error getting services | ERROR: " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async getServiceById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_USER])))
                return res.status(401).send("401 Unauthorized");
            const { id } = req.params;
            await this.clientDB.supplierServices.findUnique({
                where: { id: parseInt(id) }, include: { partner: true }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error getting service by id " + id + " | ERROR: " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async createService(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const { name, type, info, partner } = req.body;
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
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async editServiceById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const { name, type, result, info, partner } = req.body;
            const { id } = req.params;
            if (name !== undefined) {
                await this.clientDB.supplierServices.update({
                    where: { id: parseInt(id) },
                    data: {
                        name: name
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: "Error editing %name% field by id " + id + " | ERROR: " + e
                    });
                });
            }
            if (type !== undefined) {
                await this.clientDB.supplierServices.update({
                    where: { id: parseInt(id) },
                    data: {
                        type: type
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: "Error editing %type% field by id " + id + " | ERROR: " + e
                    });
                });
            }
            if (result !== undefined) {
                await this.clientDB.supplierServices.update({
                    where: { id: parseInt(id) },
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
                    });
                });
            }
            if (info !== undefined) {
                await this.clientDB.supplierServices.update({
                    where: { id: parseInt(id) },
                    data: {
                        info: info
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: "Error editing %info% field by id " + id + " | ERROR: " + e
                    });
                });
            }
            if (partner !== undefined) {
                await this.clientDB.supplierServices.update({
                    where: { id: parseInt(id) },
                    data: {
                        partnerId: partner
                    }
                }).catch(e => {
                    return res.status(400).json({
                        msg: "Error editing %partner% field by id " + id + " | ERROR: " + e
                    });
                });
            }
            await this.clientDB.supplierServices.findUnique({
                where: { id: parseInt(id) }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error getting edited service by id " + id + " | ERROR: " + e
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async deleteServiceById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const { id } = req.params;
            await this.clientDB.supplierServices.delete({
                where: { id: parseInt(id) }
            }).then(() => {
                return res.status(200).send("Service was deleted");
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error deleting service by id " + id + " | ERROR: " + e
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
    core_1.Get("services"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getAllService", null);
__decorate([
    core_1.Get("service/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServiceById", null);
__decorate([
    core_1.Post("service"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "createService", null);
__decorate([
    core_1.Put("service/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "editServiceById", null);
__decorate([
    core_1.Delete("service/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteServiceById", null);
ServiceController = __decorate([
    core_1.Controller("api")
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map