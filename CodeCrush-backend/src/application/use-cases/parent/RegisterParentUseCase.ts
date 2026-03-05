import { Parent } from "../../../domain/entities/Parent";
import { IParentRepository } from "../../../domain/repositories/IParentRepository";
import { IHashService } from "../../interfaces/IHashService";

export class RegisterParentUseCase {
    constructor (
        private parentRepository:IParentRepository,
        private hashService:IHashService
    )  {}

    async execute( name: string, email: string, password: string) : Promise<Parent> {

        // Checking if mail exist
        const existingParent = await this.parentRepository.findByEmail(email);
        if(existingParent) {
            throw new Error(" Email already registered");
        }

        //Password hashing
        const hashedPassword = await this.hashService.hash(password);

        //Create parent object
        const parent:Parent = {
            name,
            email,
            password: hashedPassword,
            isBlocked:false,
            childrenIds:[]    
        };

        //saving the parent to repository
        return await this.parentRepository.create(parent);

    }
}