"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTConfigure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_type_1 = require("../types/role.type");
class JWTConfigure {
    async validateToken(req, client, roles = [role_type_1.Role.ROLE_USER]) {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const tokenData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            let tokenExists = [];
            for (const role of roles) {
                if (tokenExists.length > 0)
                    break;
                tokenExists = await client.token.findMany({
                    where: {
                        token: token,
                        users: {
                            login: tokenData.data.login,
                            role: role_type_1.Role[role]
                        }
                    },
                    include: { users: true }
                });
            }
            if (tokenExists.length > 0) {
                console.info("VERIFY TOKEN:", "VERIFIED");
                return true;
            }
            else {
                console.error("VERIFY TOKEN:", "Token or User is not valid!");
                return false;
            }
        }
        catch (e) {
            console.error("VERIFY TOKEN:", "Invalid signature or token is expired!");
            return false;
        }
    }
    generateJWT(user, isRemember) {
        const data = {
            id: user.id,
            login: user.login,
            role: user.role
        };
        if (isRemember)
            return jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET, { subject: 'auth' });
        else
            return jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET, {
                subject: 'auth',
                expiresIn: process.env.JWT_EXPIRATION
            });
    }
}
exports.JWTConfigure = JWTConfigure;
//# sourceMappingURL=JWTConfigure.js.map