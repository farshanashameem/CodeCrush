import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class ToggleBlockChildUseCase {
    constructor ( private childRepository: IChildRepository)  {}

    
    async execute ( parentId: string, childId: string ) : Promise<Child | null > {

        if(!childId) {
            throw new Error("Child id is required");
        }

        const child = await this.childRepository.getChildById(parentId, childId );
         
        if(!child) {
            throw new Error ("Child not found");
        }

        if(child.parentId !== parentId){
            throw new Error("Unauthorized access");
        }
        return  await this.childRepository.toggleBlockChild ( parentId,childId );
    }
}