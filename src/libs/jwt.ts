import jwt from "jsonwebtoken";
import { env } from "../config/env";


export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}


export const signToken = (payload: JwtPayload): string => {
    //       const options: SignOptions = {
    //     expiresIn: env.jwtExpiration as SignOptions["expiresIn"],
    //   };
    //  return jwt.sign({ id, role }, env.jwtSecret, options);
    return jwt.sign(payload, env.jwtSecret as string, {
        expiresIn: '1h', // 1m 15m h d
    });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.jwtSecret as string) as JwtPayload;
};