import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

export class JWTConfigure {

  async validateUserToken(token: string, client: PrismaClient) {
    try {
      let result = {};
      const tokens = await client.token.findMany({
        where: {token: token}
      });
      if (tokens.length > 0) {
        const tokenData: any = jwt.verify(token, process.env.JWT_SECRET);
        const nowDate = Math.round((new Date()).getTime() / 1000);

        await client.user.findUnique({
          where: {login: tokenData['data'].login}
        }).then(() => {
          if (tokenData.exp === undefined) {
            result = {
              type: "success",
              tokenVerified: true,
              role: tokenData.role
            };
          }else if (nowDate < tokenData.exp) {
            result = {
              type: "success",
              tokenVerified: true,
              role: tokenData.role
            };
          } else {
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
      } else {
        return {
          type: "error",
          tokenVerified: false,
          msg: "Token is not exists!"
        }
      }
    } catch (e) {
      return {
        type: "error",
        tokenVerified: false,
        msg: "Invalid signature or token is expired!"
      };
    }
  }

  generateJWT(user: any, isRemember: boolean) {
    const data = {
      id: user.id,
      login: user.login,
      role: user.role
    };

    if (isRemember)
      return jwt.sign(
        {data},
        process.env.JWT_SECRET,
        {subject: 'auth'}
        );
    else
      return jwt.sign(
        {data},
        process.env.JWT_SECRET,
        {
          subject: 'auth',
          expiresIn: process.env.JWT_EXPIRATION
        });
  }
}
