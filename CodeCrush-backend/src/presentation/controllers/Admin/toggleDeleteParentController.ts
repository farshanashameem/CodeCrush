import { Request, Response } from "express";
import { ToggleDeleteParentUseCase } from "../../../application/use-cases/admin/ToggleDeleteParentUseCase";

export class ToggleDeleteParentController {
  constructor(private toggleDeleteParentUseCase: ToggleDeleteParentUseCase) {}

  async toggle(req: Request, res: Response) {
    try {
      const parentId = req.params.id;

      const parent = await this.toggleDeleteParentUseCase.execute(parentId);

      if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      res.status(200).json({
        message: `Parent ${parentId} ${
          parent.isDeleted ? "deleted" : "restored"
        } successfully`,
        parent,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}