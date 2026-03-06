import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class GetChildUseCase {
    constructor( private childRepository : IChildRepository) {}

    async execute (childId: string): Promise<Child> {
        const child = await this.childRepository.getChildById( childId );
         
        if(!child) {
            throw new Error ("Child not found");
        }

        return child;
    }
}