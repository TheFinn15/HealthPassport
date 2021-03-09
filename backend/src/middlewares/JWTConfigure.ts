import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import {JWTResult} from "../types/jwt.type";


export class JWTConfigure {

  async validateToken(token: string, client: PrismaClient) : Promise<JWTResult> {
    try {
      let result: any = {};
      const tokens = await client.token.findMany({
        where: {token: token}
      });
      if (tokens.length > 0) {
        const tokenData: any = jwt.verify(token, process.env.JWT_SECRET);

        await client.user.findUnique({
          where: {login: tokenData['data'].login}
        }).then(() => {
          result = {
            type: "success",
            tokenVerified: true,
            role: tokenData.data.role,
            decoded: jwt.decode(token)
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
