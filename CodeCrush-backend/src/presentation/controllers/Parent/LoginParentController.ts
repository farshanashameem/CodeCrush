import { Request, Response } from "express";
import { LoginParentUseCase } from "../../../application/use-cases/parent/LoginParentUseCase";

export class LoginParentController {

  constructor(private loginParentUseCase: LoginParentUseCase) {}

  async login(req: Request, res: Response) {

    try {

      const { email, password } = req.body;

      const result = await this.loginParentUseCase.execute(email, password);

      // ✅ Store refreshToken in HTTP-only cookie
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,        // true in production (HTTPS)
        sameSite: "lax",      // important when frontend & backend ports differ
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(200).json({
        user: result.parent
          ? {
              id: result.parent.id,
              name: result.parent.name,
              email: result.parent.email,
              role: "parent",
            }
          : null,
        accessToken: result.accessToken
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

  }
}