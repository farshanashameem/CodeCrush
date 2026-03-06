import { Request, Response } from "express";
import { AddChildUseCase } from "../../../application/use-cases/child/AddChildUseCase";
import { MongoChildRepository } from "../../../infrastructure/repositories/MongoChildRepository";
import { AuthRequest } from "../../middlewares/authMiddleware";

const childRepository = new MongoChildRepository();
const addChildUseCase = new AddChildUseCase( childRepository );

export const addChild = async (req: AuthRequest, res: Response ) => {
    try {

        const parentId = req.parent?.id;

        const child = await addChildUseCase.execute({...req.body, parentId});

        res.status(201).json( child );
    } catch ( error: any ) {
        res.status(400).json({ message:error.message });
    }
}