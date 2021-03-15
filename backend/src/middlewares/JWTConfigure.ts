import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import {Request} from "express";
import {Role} from "../types/role.type";
import {JwtType} from "../types/jwt.type";


export class JWTConfigure {

  async validateToken(req: Request, client: PrismaClient, roles: Role[] = [Role.ROLE_USER]) : Promise<boolean> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const tokenData: JwtType = jwt.verify(token, process.env.JWT_SECRET) as JwtType;

      let tokenExists = [];
      for (const role of roles) {
        if (tokenExists.length > 0) break;
        tokenExists = await client.token.findMany({
          where: {
            token: token,
            users: {
              login: tokenData.data.login,
              role: Role[role] as any
            }
          },
          include: {users: true}
        });
      }
      if (tokenExists.length > 0) {
        console.info("VERIFY TOKEN:", "VERIFIED")

        return true;
      } else {
        console.error("VERIFY TOKEN:", "Token or User is not valid!");
        return false;
      }
    } catch (e) {
      console.error("VERIFY TOKEN:", "Invalid signature or token is expired!");
      return false;
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
