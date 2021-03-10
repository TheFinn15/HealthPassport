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
exports.CapabilityController = void 0;
const client_1 = require("@prisma/client");
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const core_1 = require("@overnightjs/core");
const role_type_1 = require("../types/role.type");
let CapabilityController = class CapabilityController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getCaps(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        await this.clientDB.userCapability.findMany({
            include: { user: true }
        })
            .then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting caps | " + e
            });
        });
    }
    async getCapById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        await this.clientDB.userCapability.findUnique({
            where: { id: parseInt(id) }, include: { user: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting cap by id " + id + " | " + e
            });
        });
    }
    async createCapability(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { name, info, user } = req.body;
        await this.clientDB.userCapability.create({
            data: {
                name: name,
                info: info,
                userId: user.id
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error creating cap | " + e
            });
        });
    }
    async editCapById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        const { name, info, user } = req.body;
        if (name !== undefined)
            await this.clientDB.userCapability.update({
                where: { id: parseInt(id) },
                data: {
                    name: name
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error edit field name | " + e
                });
            });
        if (info !== undefined)
            await this.clientDB.userCapability.update({
                where: { id: parseInt(id) },
                data: {
                    info: info
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error edit field info | " + e
                });
            });
        if (user !== undefined)
            await this.clientDB.userCapability.update({
                where: { id: parseInt(id) },
                data: {
                    user: user
                }
            }).catch(e => {
                return res.status(400).json({
                    msg: "Error edit field user | " + e
                });
            });
        // if (result !== undefined)
        //   await this.clientDB.userCapability.update({
        //     where: {id: parseInt(id)},
        //     data: {
        //       resultSurveyId: result
        //     }
        //   }).catch(e => {
        //     return res.status(400).json({
        //       msg: "Error edit field user | " + e
        //     });
        //   });
        await this.clientDB.userCapability.findUnique({
            where: { id: parseInt(id) }, include: { user: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error get edited cap | " + e
            });
        });
    }
    async delCapById(req, res) {
        if (!(await this.jwtConfigure.validateToken(req, this.clientDB, [role_type_1.Role.ROLE_ADMIN, role_type_1.Role.ROLE_PARTNER])))
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        await this.clientDB.userCapability.delete({
            where: { id: parseInt(id) }
        }).then(() => {
            return res.status(200).json({
                isDelete: true
            });
        }).catch(e => {
            return res.status(400).json({
                isDelete: false,
                msg: "Error delete cap by id " + id + " | " + e
            });
        });
    }
};
__decorate([
    core_1.Get("caps"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapabilityController.prototype, "getCaps", null);
__decorate([
    core_1.Get("cap/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapabilityController.prototype, "getCapById", null);
__decorate([
    core_1.Post("caps"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapabilityController.prototype, "createCapability", null);
__decorate([
    core_1.Put("cap/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapabilityController.prototype, "editCapById", null);
__decorate([
    core_1.Delete("cap/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapabilityController.prototype, "delCapById", null);
CapabilityController = __decorate([
    core_1.Controller("api")
], CapabilityController);
exports.CapabilityController = CapabilityController;
//# sourceMappingURL=capability.controller.js.map