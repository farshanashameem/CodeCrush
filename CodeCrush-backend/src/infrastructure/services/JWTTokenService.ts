import jwt from "jsonwebtoken";
import { ITokenservice } from "../../application/interfaces/ITokenService";

export class JWTTokenService implements ITokenservice {

    generateAccessToken(payload: object): string {
        return jwt.sign( payload,process.env.JWT_ACCESS_SECRET as string,{
            expiresIn: "15m"
        } );
    }

    //Generating refresh token
    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string,{
            expiresIn: "7d"
        });
    }

    //Access Token verification
    verifyAccessToken(token: string) {
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET as string);
    }

    //Refresh Token verification
    verifyRefreshToken(token: string) {
        return jwt.verify( token, process.env.JWT_REFRESH_SECRET as string);
    }
}