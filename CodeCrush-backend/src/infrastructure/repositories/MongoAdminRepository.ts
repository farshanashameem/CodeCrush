import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { Admin } from "../../domain/entities/Admin";
import { AdminModel } from "../database/models/AdminModel";

export class MongoAdminRepository implements IAdminRepository {

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({ email }).exec();
        return admin ? admin.toObject() : null;
    }

    async findById(id: string): Promise<Admin | null> {

    const admin = await AdminModel.findById(id);

    if (!admin) return null;

    return  admin ? admin.toObject() : null;

}

    async updateRefreshToken(adminId: string, token: string): Promise<void> {
        await AdminModel.findByIdAndUpdate(adminId, { refreshToken: token }).exec();
    }

    async clearRefreshToken(adminId: string): Promise<void> {
        await AdminModel.findByIdAndUpdate(adminId, { refreshToken: null }).exec();
    }
}