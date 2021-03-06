"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTConfigure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTConfigure {
    async validateUserToken(token, client) {
        try {
            let result = {};
            const tokens = await client.token.findMany({
                where: { token: token }
            });
            if (tokens.length > 0) {
                const tokenData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const nowDate = Math.round((new Date()).getTime() / 1000);
                await client.user.findUnique({
                    where: { login: tokenData['data'].login }
                }).then(() => {
                    if (tokenData.exp === undefined) {
                        result = {
                            type: "success",
                            tokenVerified: true,
                            role: tokenData.role,
                            decoded: jsonwebtoken_1.default.decode(token)
                        };
                    }
                    else if (nowDate < tokenData.exp) {
                        result = {
                            type: "success",
                            tokenVerified: true,
                            role: tokenData.role,
                            decoded: jsonwebtoken_1.default.decode(token)
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
            else {
                return {
                    type: "error",
                    tokenVerified: false,
                    msg: "Token is not exists!"
                };
            }
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