import { Request,Response } from "express";
import { RegisterParentUseCase } from "../../../application/use-cases/parent/RegisterParentUseCase";
import { LoginParentUseCase } from "../../../application/use-cases/parent/LoginParentUseCase";
import { RefershTokenUseCase } from "../../../application/use-cases/parent/RefreshTokenUseCase";

export class ParentAuthController {

    constructor(
        private registerParentUseCase: RegisterParentUseCase,
        private loginParentUseCase: LoginParentUseCase,
        private refreshTokenUseCase: RefershTokenUseCase
    ) {}

    //Parent Registration
    async register( req:Request, res:Response) {
        try {
             
            const { name, email, password } = req.body;

            const parent = await this.registerParentUseCase.execute(
                name,email,password
            );

            res.status(201).json(parent);
        } catch(error:any) {
            res.status(400).json({ message: error.message});
        }
    }

    //Parent Login
    async login (req:Request, res:Response) {
        try{

            const { email, password } = req.body;

            const result = await this.loginParentUseCase.execute(email, password );
            res.status(200).json({
                parent: result.parent,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        } catch( error: any ) {
            res.status(400).json({message:error.message});
        }
    }

    //creating new Access token
    async refresh ( req:Request, res:Response) {

        try {

            const { refreshToken } = req.body;

            if( !refreshToken ) {
                return res.status(400).json({
                    message: "Refresh token required"
                });
            }

            const accessToken = await this.refreshTokenUseCase.execute( refreshToken );
            res.status(200).json({ accessToken });
        } catch ( error ) {
            res.status(401).json ({ message: "Invalid refresh token"});
        }
    }
}