import { IParentRepository } from "../../../domain/repositories/IParentRepository";
import { OTPService } from "../../../infrastructure/services/OTPService";

export class ForgotPasswordUseCase {
    constructor(
        private parentRepository: IParentRepository,
        private otpService: OTPService
    ) {}

    async execute ( email: string ) : Promise<{ email: string; otp: number; expiresAt: number }> {
        
        // Check if parent exists
        const parent = await this.parentRepository.findByEmail( email ) ;

        if( !parent ) {
             throw new Error("Parent not found");
        }

        //Generate OTP
        const otp = this.otpService.generateOTP();

        const expiresAt = this.otpService.getExpiryTime();
        return {
            email, otp, expiresAt
        }
    }
}