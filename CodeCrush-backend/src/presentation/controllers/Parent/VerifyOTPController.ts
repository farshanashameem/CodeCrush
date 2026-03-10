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
        return res.status(400).json({
          message: "Session expired"
        });
      }

      if (Date.now() > sessionData.expiresAt) {
        return res.status(400).json({
          message: "OTP expired"
        });
      }

      if (sessionData.attempts >= 5) {
        return res.status(400).json({
          message: "Too many attempts"
        });
      }

      if (parseInt(otp) !== sessionData.otp) {
        sessionData.attempts += 1;
        return res.status(400).json({
          message: "Invalid OTP"
        });
      }

      // OTP SUCCESS
      if (sessionData.type === "register") {

        if (!sessionData.name || !sessionData.password) {
          return res.status(400).json({
            message: "Invalid session data"
          });
        }

        const parent = await this.registerParentUseCase.execute(
          sessionData.name,
          sessionData.email,
          sessionData.password
        );

        delete req.session.otpData;

        return res.status(201).json({
          message: "Parent registered successfully",
          parent
        });

      }

      if (sessionData.type === "reset") {

        req.session.resetAllowed = true;
         delete req.session.otpData;
         
        return res.json({
          message: "OTP verified. You can now reset password."
        });

      }

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }
}