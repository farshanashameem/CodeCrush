import { IParentRepository } from "../../../domain/repositories/IParentRepository";

export class LogoutUseCase {
    constructor ( private parentRepository: IParentRepository ) {};

    async execute (parentId: string ) : Promise< void > {
        await this.parentRepository.updateRefreshToken(parentId, null);
    }
}