import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class DeleteChildUseCase {
    constructor( private childRepository: IChildRepository) {}

    async execute (childId: string ) : Promise<void> {
        return await this.childRepository.deleteChild( childId );
    }
}