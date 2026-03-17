import { Request, Response, NextFunction } from "express";
import { ITokenservice } from "../../application/interfaces/ITokenService"; 


export interface AuthRequest extends Request {
    parent?: {
        id: string;
        email: string;
    }

    admin?: {
        id: string;
        email: string;
    };
}

export const parentAuthMiddleware =(tokenService: ITokenservice) => {

    return (req: AuthRequest, res: Response, next: NextFunction) => {

    try{

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer "))  {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = tokenService.verifyAccessToken(token);

        //Attatch parent Info to request
        req.parent = decoded;

        next();
    } catch( error:any ) {
       return res.status(401).json({ message:"Invalid or expired token"});
    }
};
};