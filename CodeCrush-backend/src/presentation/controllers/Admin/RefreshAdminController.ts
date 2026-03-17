import { Request, Response } from "express";
import { RefreshAdminTokenUseCase } from "../../../application/use-cases/admin/RefreshAdminTokenUseCase";

export class RefreshAdminTokenController {
  constructor(private refreshAdminTokenUseCase: RefreshAdminTokenUseCase) {}

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.adminRefreshToken;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
      }

      const accessToken = await this.refreshAdminTokenUseCase.execute(refreshToken);

      res.status(200).json({ accessToken });
    } catch (error: any) {
      res.status(401).json({
        message: error.message || "Invalid refresh token",
      });
    }
  }
}