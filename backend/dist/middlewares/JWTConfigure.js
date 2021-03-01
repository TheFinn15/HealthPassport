"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTConfigure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTConfigure {
    // TODO: Контролирование каждого созданого токена ( Модель Токена )
    async validateUserToken(token, client) {
        try {
            let result = {};
            const tokenData = jsonwebtoken_1.default.verify(token, "T0p_S3cr3t");
            const nowDate = Math.round((new Date()).getTime() / 1000);
            await client.user.findUnique({
                where: { login: tokenData['data'].login }
            }).then(() => {
                if (tokenData.exp === undefined) {
                    result = {
                        type: "success",
                        tokenVerified: true,
                        role: tokenData.role
                    };
                }
                if (nowDate < tokenData.exp) {
                    result = {
                        type: "success",
                        tokenVerified: true,
                        role: tokenData.role
                    };
                }
                else {
                    result = {
                        type: "error",
                        tokenVerified: false,
                        msg: "Token is expired !"
                    };
                }
            }).catch(() => {
                result = {
                    type: "error",
                    tokenVerified: false,
                    msg: "User not exists!"
                };
            });
            return result;
        }
        catch (e) {
            return {
                type: "error",
                tokenVerified: false,
                msg: "Invalid signature or token is expired!"
            };
        }
    }
    generateJWT(user, isRemember) {
        const data = {
            id: user.id,
            login: user.login,
            role: user.role
        };
        const signature = "T0p_S3cr3t";
        const exp = "24h";
        if (isRemember)
            return jsonwebtoken_1.default.sign({ data }, signature, { subject: 'auth' });
        else
            return jsonwebtoken_1.default.sign({ data }, signature, { subject: 'auth', expiresIn: exp });
    }
}
exports.JWTConfigure = JWTConfigure;
//# sourceMappingURL=JWTConfigure.js.map