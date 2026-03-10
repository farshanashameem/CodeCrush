import { Request, Response } from "express";
import { ResetPasswordUseCase } from "../../../application/use-cases/parent/ResetPasswordUseCase";

export class ResetPasswordController {

  constructor(
    private resetPasswordUseCase: ResetPasswordUseCase
  ) {}

  async reset(req: Request, res: Response) {

    try {

      //  Check if OTP verification happened
      if (!req.session.resetAllowed) {
        return res.status(403).json({
          message: "OTP verification required"
        });
      }

      const { password } = req.body;
      const email = req.session.otpData?.email;

      //  Validate session
      if (!email) {
        return res.status(400).json({
          message: "Session expired"
        });
      }

      //  Reset password
      await this.resetPasswordUseCase.execute(email, password);

      //  Clear session
      delete req.session.otpData;
      req.session.resetAllowed = false;

      res.status(200).json({
        message: "Password reset successful"
      });

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }
}