import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class ToggleDeleteChildUseCase {
    constructor( private childRepository: IChildRepository) {}

    async execute ( parentId:string, childId: string ) : Promise<Child | null > {

        const child = await this.childRepository.getChildById( parentId,childId );

        if(child?.parentId !== parentId) {
            throw new Error ("Unauthorized");
        }
        if(!child) {
            throw new Error ("Child not found");
        }

        const updatedChild = await this.childRepository.toggleDeleteChild(parentId, childId);

        if (!updatedChild) {
            throw new Error("Toggle failed");
        }

        return updatedChild;
       
    }
}