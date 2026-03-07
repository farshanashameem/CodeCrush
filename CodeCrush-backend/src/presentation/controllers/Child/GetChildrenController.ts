import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { getChildrenUseCase } from "../../../infrastructure/container/ChildContainer";

export const getChildren = async ( req:AuthRequest, res:Response ) => {

    try {

        const parentId = req.parent?.id;

        if( !parentId ) {
            res.status(401).json({ message: "Unauthorized"});
        }

        const children = await getChildrenUseCase.execute( parentId! );
        res.status(200).json(children);
    } catch ( error:any ) {
        res.status(400).json({ message: error.message});
    }
}