import { Request, Response } from "express";
import { OTPService } from "../../../infrastructure/services/OTPService";
import { EmailService } from "../../../infrastructure/services/EmailService";
import { ForgotPasswordUseCase } from "../../../application/use-cases/parent/ForgotPasswordUseCase";

export class ForgotPasswordController {

  constructor(
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private otpService: OTPService,
    private emailService: EmailService
  ) {}

  async sendOTP(req: Request, res: Response) {

    const { email } = req.body;

    const { otp, expiresAt } = await this.forgotPasswordUseCase.execute(email);

    req.session.otpData = {
      email,
      otp,
      expiresAt,
      attempts: 0,
      resendCount: 0,
      type: "reset"
    };

    await this.emailService.sendOTP(email, otp);

    res.json({
      message: "OTP sent to email"
    });
  }
}