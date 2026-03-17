import { IParentRepository } from "../../../domain/repositories/IParentRepository";

export class ToggleBlockParentUseCase {
    constructor( private parentRepository: IParentRepository) {} 

    async execute ( parentId: string) {
        return await this.parentRepository.toggleBlockParent( parentId);
    }
}