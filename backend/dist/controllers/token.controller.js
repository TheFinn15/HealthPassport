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
exports.TokenController = void 0;
const core_1 = require("@overnightjs/core");
const client_1 = require("@prisma/client");
const JWTConfigure_1 = require("../middlewares/JWTConfigure");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
let TokenController = class TokenController {
    constructor() {
        this.clientDB = new client_1.PrismaClient();
        this.jwtConfigure = new JWTConfigure_1.JWTConfigure();
    }
    async getTokens(req, res) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateToken(req, this.clientDB);
        if (!(!verifyToken.tokenVerified && verifyToken.role !== "ROLE_ADMIN"))
            return res.status(401).send("401 Unauthorized");
        await this.clientDB.token.findMany({
            include: { users: true }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting tokens | " + e
            });
        });
    }
    async getTokenById(req, res) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateToken(req, this.clientDB);
        if (!verifyToken.tokenVerified || verifyToken.role !== "ROLE_ADMIN")
            return res.status(401).send("401 Unauthorized");
        const { id } = req.params;
        await this.clientDB.token.findUnique({
            where: { id: parseInt(id) }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error getting token by id " + id + " | " + e
            });
        });
    }
    async editTokenById(req, res) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = await this.jwtConfigure.validateToken(req, this.clientDB);
        if (!verifyToken.tokenVerified)
            return res.status(401).send("401 Unauthorized");
        const { ip } = req.body;
        const geoInfo = geoip_lite_1.default.lookup(ip);
        let location = `${geoInfo.country}, ${geoInfo.city}`;
        const curToken = await this.clientDB.token.findMany({
            where: { token: token }
        });
        await this.clientDB.token.update({
            where: { id: curToken[0].id },
            data: {
                ip: ip,
                lastOnlineTime: new Date().toISOString(),
                location: location
            }
        }).then(resp => {
            return res.status(200).json(resp);
        }).catch(e => {
            return res.status(400).json({
                msg: "Error edit token | " + e
            });
        });
    }
};
__decorate([
    core_1.Get("tokens"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getTokens", null);
__decorate([
    core_1.Get("token/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenById", null);
__decorate([
    core_1.Put("token"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "editTokenById", null);
TokenController = __decorate([
    core_1.Controller("api")
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map