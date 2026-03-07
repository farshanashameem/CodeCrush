import { MongoChildRepository } from "../repositories/MongoChildRepository";
import { AddChildUseCase } from "../../application/use-cases/child/AddChildUseCase";
import { GetChildrenUseCase } from "../../application/use-cases/child/GetChildrenUseCase";
import { GetChildUseCase } from "../../application/use-cases/child/GetChildUseCase";
import { UpdateChildUseCase } from "../../application/use-cases/child/UpdateChildUseCase";
import { ToggleBlockChildUseCase } from "../../application/use-cases/child/ToggleBlockChildUseCase";
import { ToggleDeleteChildUseCase } from "../../application/use-cases/child/ToggleDeleteChildUseCase";

const childRepository = new MongoChildRepository();
export const addChildUseCase = new AddChildUseCase( childRepository );

export const getChildrenUseCase = new GetChildrenUseCase( childRepository );

export const getChildUseCase = new GetChildUseCase( childRepository );

export const updateChildUseCase = new UpdateChildUseCase( childRepository );

export const toggleBlockChildUseCase = new ToggleBlockChildUseCase( childRepository );

export const toggleDeleteChildUseCase = new ToggleDeleteChildUseCase ( childRepository ); 