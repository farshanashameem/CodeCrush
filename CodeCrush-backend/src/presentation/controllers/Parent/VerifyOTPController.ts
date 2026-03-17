import { Request, Response } from "express";
import { RegisterParentUseCase } from "../../../application/use-cases/parent/RegisterParentUseCase";

export class VerifyOTPController {

  constructor(
    private registerParentUseCase: RegisterParentUseCase
  ) {}

  async verify(req: Request, res: Response) {

    try {
      const { otp } = req.body;
      const sessionData = req.session.otpData;

      if (!sessionData) {
        return res.status(400).json({ message: "Session expired" });
      }

      // Convert input OTP safely
      const inputOtp = parseInt((otp || "").toString().trim(), 10);

      if (isNaN(inputOtp)) {
        return res.status(400).json({ message: "Invalid OTP format" });
      }

      // Check expiry
      if (Date.now() > sessionData.expiresAt) {
        delete req.session.otpData;
        return res.status(400).json({ message: "OTP expired" });
      }

      // Check max attempts
      if (sessionData.attempts >= 5) {
        delete req.session.otpData;
        return res.status(400).json({ message: "Too many attempts. Please resend OTP." });
      }

      console.log("Input OTP:", inputOtp, "Session OTP:", sessionData.otp);

      // Verify OTP
      if (inputOtp !== sessionData.otp) {
        sessionData.attempts += 1;
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // OTP SUCCESS
      if (sessionData.type === "register") {

        if (!sessionData.name || !sessionData.password) {
          return res.status(400).json({ message: "Invalid session data" });
        }

        const parent = await this.registerParentUseCase.execute(
          sessionData.name,
          sessionData.email,
          sessionData.password
        );

        // Clear session data
        delete req.session.otpData;

        return res.status(201).json({
          message: "Parent registered successfully",
          parent
        });
      }

      if (sessionData.type === "reset") {

        // Allow password reset
        req.session.resetAllowed = true;
        delete req.session.otpData;

        return res.json({
          message: "OTP verified. You can now reset your password."
        });
      }

      // Fallback (should not reach here)
      return res.status(400).json({ message: "Unknown OTP type" });

    } catch (error: any) {
      console.error("VerifyOTPController error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}