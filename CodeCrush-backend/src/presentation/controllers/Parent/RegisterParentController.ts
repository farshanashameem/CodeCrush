import { Request, Response } from "express";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { EmailService } from "../../../infrastructure/services/EmailService";

export class RegisterParentController {

    constructor(
        private otpService: OTPService,
        private emailService: EmailService
    ) {}

    async register(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body;

            const otp = this.otpService.generateOTP();
            const expiresAt = this.otpService.getExpiryTime();

            req.session.otpData = {
                name,
                email,
                password,
                otp,
                expiresAt,
                attempts: 0,
                resendCount: 0,
                type: "register"
            };

            await this.emailService.sendOTP(email, otp);

            res.status(200).json({
                message: "OTP sent to email"
            });

        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }
}