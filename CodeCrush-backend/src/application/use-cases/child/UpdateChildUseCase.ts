import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class UpdateChildUseCase {
    constructor ( private childRepository: IChildRepository) {}

    async execute(childId: string, data: Partial<Child>): Promise<Child> {
        const child = await this.childRepository.updateChild( childId, data );

        if(!child) {
            throw new Error ("Child not found");
        }

        return child;
    } 
}