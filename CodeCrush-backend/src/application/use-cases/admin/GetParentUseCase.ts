import { IParentRepository } from "../../../domain/repositories/IParentRepository";
import { Parent } from "../../../domain/entities/Parent";

export class GetParentUseCase {
    constructor( private parentRepository: IParentRepository) {}

    async execute(): Promise<Parent[]> {
        return await this.parentRepository.getAllParents();
        
    }
}