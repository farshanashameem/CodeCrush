import { Request, Response } from "express";
import { ToggleBlockParentUseCase } from "../../../application/use-cases/admin/ToggleBlockParentUseCase";

export class ToggleBlockParentController {
  constructor(private toggleBlockParentUseCase: ToggleBlockParentUseCase) {}

  async toggle(req: Request, res: Response) {
    try {
      const parentId = req.params.id;

      const parent = await this.toggleBlockParentUseCase.execute(parentId);
     if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      res.status(200).json({
        message: `Parent ${parentId} ${parent.isBlocked ? "blocked" : "unblocked"} successfully`,
        parent,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}