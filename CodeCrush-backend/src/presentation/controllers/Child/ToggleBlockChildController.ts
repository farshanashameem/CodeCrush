import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { toggleBlockChildUseCase } from "../../../infrastructure/container/ChildContainer";

export const toggleBlockChild = async (req: AuthRequest, res: Response) => {
    try {

        const parentId = req.parent?.id;
        const childId = req.params.id;

        if (!parentId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!childId) {
            return res.status(400).json({ message: "Child id required" });
        }

        const child = await toggleBlockChildUseCase.execute(parentId, childId);
        if (!child) return res.status(404).json({ message: "Child not found" });
        
        return res.status(200).json({
            message: child?.isBlocked ? "Child blocked" : "Child unblocked",
            child
        });

    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};