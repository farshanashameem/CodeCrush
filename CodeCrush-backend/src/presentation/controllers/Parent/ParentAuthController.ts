import { Request,Response } from "express";
import { RegisterParentUseCase } from "../../../application/use-cases/parent/RegisterParentUseCase";
import { LoginParentUseCase } from "../../../application/use-cases/parent/LoginParentUseCase";
import { RefershTokenUseCase } from "../../../application/use-cases/parent/RefreshTokenUseCase";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { EmailService } from "../../../infrastructure/services/EmailService";

export class ParentAuthController {

    constructor(
        private registerParentUseCase: RegisterParentUseCase,
        private loginParentUseCase: LoginParentUseCase,
        private refreshTokenUseCase: RefershTokenUseCase,
        private otpService: OTPService,
        private emailService: EmailService
    ) {}

    //Parent Registration
    async register( req:Request, res:Response) {
        try {
             
            const { name, email, password } = req.body;

            const otp = this.otpService.generateOTP();
            const expiresAt = this.otpService.getExpiryTime();

            req.session.otpData = {
                name,email,password, otp, expiresAt, attempts:0,resendCount:0, type: "register"
            }

            await this.emailService.sendOTP(email, otp);

            res.status(200).json({
                message: "OTP sent to email"
            });

           
        } catch(error:any) {
            res.status(400).json({ message: error.message});
        }
    }

    //OTP verification
    async verifyOTP ( req: Request, res:Response) {

        try{

            const { otp } = req.body;

            const sessionData = req.session.otpData;

            if(!sessionData) {
                return res.status(400).json({ message: "Session Expired"});
            }

            if (Date.now() > sessionData.expiresAt) {
                return res.status(400).json({ message: "OTP expired" });
            }

             if (sessionData.attempts >= 5) {
                return res.status(400).json({ message: "Too many attempts" });
            }

            if (parseInt(otp) !== sessionData.otp) {
                sessionData.attempts += 1;
                return res.status(400).json({ message: "Invalid OTP" });
            }

            if (!sessionData.name || !sessionData.password) {
            return res.status(400).json({ message: "Invalid session data" });
            }

            const parent = await this.registerParentUseCase.execute(
                sessionData.name,
                sessionData.email,
                sessionData.password
            );

            req.session.otpData = undefined;

            res.status(201).json({
                message: "Parent registered successfully",
                parent
            });
        }  catch (error:any) {

            res.status(400).json({ message: error.message });

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