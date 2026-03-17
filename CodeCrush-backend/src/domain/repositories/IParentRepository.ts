
import { Parent } from "../entities/Parent";

export interface IParentRepository {
    create(parent: Parent) : Promise<Parent>;
    findByEmail(email: string) : Promise<Parent | null>;
    findById(id: string) : Promise<Parent | null>;
    update(id: string, data:Partial<Parent>) : Promise<Parent | null>;
    updateRefreshToken( parentId: string, token: string | null): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
    getAllParents(): Promise<Parent[]>;
    toggleBlockParent( parentId: string) : Promise< Parent | null >
    toggleDeleteParent( parentId: string ) : Promise< Parent | null >;
    
}