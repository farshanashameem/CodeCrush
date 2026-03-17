import { Request, Response } from "express";
import { GetParentUseCase } from "../../../application/use-cases/admin/GetParentUseCase";

export class GetParentController {
  constructor(private getParentUseCase: GetParentUseCase) {}

  async getAll(req: Request, res: Response) {
    try {
      const parents = await this.getParentUseCase.execute();
      res.status(200).json(parents);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}