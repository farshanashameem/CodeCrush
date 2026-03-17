import { Response } from "express";
import { AuthRequest } from "../../middlewares/adminAuthMiddleware";
import { LogoutAdminUseCase } from "../../../application/use-cases/admin/LogoutAdminUseCase";

export class LogoutAdminController {
  constructor(private logoutAdminUseCase: LogoutAdminUseCase) {}

  async logout(req: AuthRequest, res: Response) {
    try {
      const adminId = req.admin?.id;

      if (!adminId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await this.logoutAdminUseCase.execute(adminId);

      // Clear refresh token cookie
      res.clearCookie("adminRefreshToken");

      res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}