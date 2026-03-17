// infrastructure/controllers/ResendOTPController.ts
import { Request, Response } from "express";
import { ResendOTPUseCase } from "../../../application/use-cases/parent/ResendOTPUseCase";

export class ResendOTPController {
  constructor(private resendOTPUseCase: ResendOTPUseCase) {}

  resendOTP = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
      const { otp, expiresAt } = await this.resendOTPUseCase.execute(email);

      // Update otpData in session
      req.session.otpData = {
        ...req.session.otpData,         // keep previous data (name, password, type)
        email,
        otp,
        expiresAt,
        attempts: req.session.otpData?.attempts ?? 0,
        resendCount: (req.session.otpData?.resendCount ?? 0) + 1,
        type: req.session.otpData?.type ?? "register"
      };

      return res.json({
        success: true,
        message: "OTP resent successfully",
        expiresAt,
        resendCount: req.session.otpData.resendCount
      });

    } catch (error) {
      console.error("Resend OTP error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP"
      });
    }
  };
}