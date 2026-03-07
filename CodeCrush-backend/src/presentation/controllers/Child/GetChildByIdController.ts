import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { getChildUseCase } from "../../../infrastructure/container/ChildContainer";

export const getChildById = async (req: AuthRequest, res: Response) => {
  try {

    const parentId = req.parent?.id;
    const childId = req.params.id;

    if (!parentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const child = await getChildUseCase.execute(parentId, childId);

    return res.status(200).json({
      message: "Child fetched successfully",
      data: child
    });

  } catch (error: any) {

    return res.status(400).json({
      message: error.message
    });

  }
};