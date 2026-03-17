import { IEmailService } from "../../interfaces/IEmailService";
import { IOTPService } from "../../interfaces/IOTPService";

export class ResendOTPUseCase {
    constructor(
        private emailService:IEmailService,
        private otpService: IOTPService
    ) {}

    async execute ( email: string):Promise< { otp: number, expiresAt: number } > {
        const otp = this.otpService.generateOTP();
        const expiresAt = this.otpService.getExpiryTime(60);

        await this.emailService.sendOTP(email, otp );

        return { otp, expiresAt };
    }
}