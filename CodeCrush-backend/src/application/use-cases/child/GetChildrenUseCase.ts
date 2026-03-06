import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class GetChildrenUseCase {
    constructor( private childrepository: IChildRepository) {}

    async execute( parentId: string ): Promise<Child[]> {
        return await this.childrepository.getChildrenByParentId(parentId);
    }
}