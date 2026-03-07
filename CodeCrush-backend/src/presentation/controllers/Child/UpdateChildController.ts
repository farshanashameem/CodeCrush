import { Response } from "express";
import { updateChildUseCase } from "../../../infrastructure/container/ChildContainer";
import { AuthRequest } from "../../middlewares/authMiddleware";

export const updateChild = async (req: AuthRequest, res: Response) => {
    try {

        const parentId = req.parent?.id;
        const childId = req.params.id;

        if (!parentId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const updatedChild = await updateChildUseCase.execute(parentId, childId, req.body);

        return res.status(200).json({
            message: "Updated Successfully",
            child: updatedChild
        });

    } catch (error: any) {

        return res.status(400).json({ message: error.message });

    }
};