import { Request, Response } from "express";
import { RefershTokenUseCase } from "../../../application/use-cases/parent/RefreshTokenUseCase";

export class RefreshTokenController {

    constructor(private refreshTokenUseCase: RefershTokenUseCase) {}

    async refresh(req: Request, res: Response) {

        try {

            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({
                    message: "Refresh token required"
                });
            }

            const accessToken = await this.refreshTokenUseCase.execute(refreshToken);

            res.status(200).json({ accessToken });

        } catch {
            res.status(401).json({
                message: "Invalid refresh token"
            });
        }

    }
}