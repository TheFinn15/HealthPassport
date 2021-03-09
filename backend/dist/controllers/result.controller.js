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
let ResultController = class ResultController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getResults(req, res) {
        await this.clientDB.resultSurvey.findMany({
            include: { user: true, survey: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting results | " + e
            });
        });
    }
    async getResultById(req, res) {
        const { id } = req.params;
        await this.clientDB.resultSurvey.findMany({
            where: { id: parseInt(id) },
            include: { user: true, survey: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting result " + id + " | " + e
            });
        });
    }
    async createResult(req, res) {
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
                        name: survey
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
        const { id } = req.params;
        const { user, survey, info, readyTime } = req.body;
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
ResultController = __decorate([
    core_1.Controller("api")
], ResultController);
exports.ResultController = ResultController;
//# sourceMappingURL=result.controller.js.map