import { Request, Response } from "express";
import { LoginParentUseCase } from "../../../application/use-cases/parent/LoginParentUseCase";

export class LoginParentController {

    constructor(private loginParentUseCase: LoginParentUseCase) {}

    async login(req: Request, res: Response) {

        try {

            const { email, password } = req.body;

            const result = await this.loginParentUseCase.execute(email, password);

            res.status(200).json({
                parent: result.parent,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });

        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }

    }
}