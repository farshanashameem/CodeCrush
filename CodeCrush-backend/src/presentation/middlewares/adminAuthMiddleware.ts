import { Request, Response, NextFunction } from "express";
import { ITokenservice } from "../../application/interfaces/ITokenService"; 


export interface AuthRequest extends Request {
   

    admin?: {
        id: string;
        email: string;
    };
}

export const adminAuthMiddleware = (tokenService: ITokenservice) => {

    return (req: AuthRequest, res: Response, next: NextFunction) => {

        try {

            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = tokenService.verifyAccessToken(token);

            req.admin = decoded;

            next();

        } catch (error: any) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};