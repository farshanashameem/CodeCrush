import { Child } from "../../../domain/entities/Child";
import { IChildRepository } from "../../../domain/repositories/IChildRepository";

export class AddChildUseCase {

    constructor (
        private childRepository: IChildRepository
    ) {}

    async execute ( data: Child): Promise<Child> {

        if (!data.name?.trim()) {
            throw new Error("Child name is required");
        }

        if (data.age === undefined || data.age <= 0) {
            throw new Error("Valid age is required");
        }

        const child = await this.childRepository.createChild( data );

        return child;
    }
}