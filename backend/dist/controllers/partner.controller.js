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
exports.PartnerController = void 0;
const core_1 = require("@overnightjs/core");
const client_1 = require("@prisma/client");
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const role_type_1 = require("../types/role.type");
let PartnerController = class PartnerController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getAll(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
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
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async getPartnerById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            await this.clientDB.partner.findUnique({
                where: { id: id }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error getting partner by id ${id} | ERROR: ${e}`
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async createPartner(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const { name, timeWork, url, about } = req.body;
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
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async editPartnerById(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            const { name, timeWork, url, about } = req.body;
            if (name !== undefined) {
                await this.clientDB.partner.update({
                    where: { id: id },
                    data: {
                        name: name
                    }
                }).catch(e => {
                    return res.status(404).json({
                        msg: `Error edit %name% field by id ${id} | ERROR: ${e}`
                    });
                });
            }
            if (timeWork !== undefined) {
                await this.clientDB.partner.update({
                    where: { id: id },
                    data: {
                        timeWork: timeWork
                    }
                }).catch(e => {
                    return res.status(404).json({
                        msg: `Error edit %timeWork% field by id ${id} | ERROR: ${e}`
                    });
                });
            }
            if (url !== undefined) {
                await this.clientDB.partner.update({
                    where: { id: id },
                    data: {
                        url: url
                    }
                }).catch(e => {
                    return res.status(404).json({
                        msg: `Error edit %url% field by id ${id} | ERROR: ${e}`
                    });
                });
            }
            if (about !== undefined) {
                await this.clientDB.partner.update({
                    where: { id: id },
                    data: {
                        about: about
                    }
                }).catch(e => {
                    return res.status(404).json({
                        msg: `Error edit %about% field by id ${id} | ERROR: ${e}`
                    });
                });
            }
            await this.clientDB.partner.findUnique({
                where: { id: id }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(404).json({
                    msg: `Unexpected error in edit partner method | ERROR: ${e}`
                });
            });
        }
        catch (e) {
            return res.status(400).json({
                msg: "Error processing request ! ERROR: " + e
            });
        }
    }
    async delete(req, res) {
        try {
            if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
                return res.status(401).send("401 Unauthorized");
            const id = parseInt(req.params.id);
            await this.clientDB.partner.delete({
                where: { id: id }
            }).then(resp => {
                return res.status(200).json(resp);
            }).catch(e => {
                return res.status(404).json({
                    msg: `Error deleting partner by id ${id} | ERROR: ${e}`
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
    core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "getAll", null);
__decorate([
    core_1.Get(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "getPartnerById", null);
__decorate([
    core_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "createPartner", null);
__decorate([
    core_1.Put(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "editPartnerById", null);
__decorate([
    core_1.Delete(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "delete", null);
PartnerController = __decorate([
    core_1.Controller("api/partner")
], PartnerController);
exports.PartnerController = PartnerController;
//# sourceMappingURL=partner.controller.js.map