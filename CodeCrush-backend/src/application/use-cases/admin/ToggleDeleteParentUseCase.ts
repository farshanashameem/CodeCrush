import { IParentRepository } from "../../../domain/repositories/IParentRepository";

export class ToggleDeleteParentUseCase {
    constructor ( private parentRepository : IParentRepository) {} 
    async execute ( parentId: string ) {
        return await this.parentRepository.toggleDeleteParent( parentId );
    }
}