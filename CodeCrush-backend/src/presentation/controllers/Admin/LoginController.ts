import { Request, Response } from "express";
import { LoginAdminUseCase } from "../../../application/use-cases/admin/LoginAdminUseCase";

export class LoginAdminController {
  constructor(private loginAdminUseCase: LoginAdminUseCase) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.loginAdminUseCase.execute(email, password);

      // Store refresh token in http-only cookie
      res.cookie("adminRefreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        admin: {
          id: result.admin.id,
          email: result.admin.email,
          role: "admin",
        },
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}