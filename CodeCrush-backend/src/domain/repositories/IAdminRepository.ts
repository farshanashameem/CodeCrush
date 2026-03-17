import { Admin } from "../entities/Admin";

export interface IAdminRepository {
    findByEmail( email: string ): Promise< Admin | null >;
    findById(id: string): Promise<Admin | null>;
    updateRefreshToken(adminId: string, token: string): Promise<void>;
    clearRefreshToken( adminId: string) : Promise<void>;
}