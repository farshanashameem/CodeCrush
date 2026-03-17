import {  Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { addChildUseCase } from "../../../infrastructure/container/ChildContainer";

export const addChild = async (req: AuthRequest, res: Response ) => {
    try {


        const parentId = req.parent?.id;

        if(!parentId) {
            return res.status(401).json({ message: "Unauthorized"});
        }
        

        const child = await addChildUseCase.execute({...req.body, parentId});

        res.status(201).json( child );
    } catch ( error: any ) {
        
        res.status(400).json({ message:error.message });
    }
}