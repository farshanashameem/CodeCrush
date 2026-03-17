import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { LogoutUseCase } from "../../../application/use-cases/parent/LogoutUseCase";

export class LogoutController {

  constructor(private logoutUseCase: LogoutUseCase) {}

  async logout(req: AuthRequest, res: Response) {

    try {

      const parentId = req.parent?.id;

      if (!parentId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // remove refresh token from database
      await this.logoutUseCase.execute(parentId);

      // ✅ clear refresh token cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false   // true in production
      });

      res.status(200).json({
        message: "Logout successful"
      });

    } catch (error: any) {

      res.status(400).json({ message: error.message });

    }

  }
}