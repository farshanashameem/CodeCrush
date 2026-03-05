import { Parent } from "../../domain/entities/Parent";
import { IParentRepository } from "../../domain/repositories/IParentRepository";
import { ParentModel } from "../database/models/ParentModel";

export class MongoParentRepository implements IParentRepository {
    async create(parent: Parent) : Promise<Parent> {
        const created = await ParentModel.create(parent);
        return this.mapToDomain(created);
    }

    async findByEmail(email: string): Promise<Parent | null> {
        const parent = await ParentModel.findOne({ email });
        return parent? this.mapToDomain(parent) : null;
    }

    async findById(id: string): Promise<Parent | null> {
        const parent = await ParentModel.findById(id);
        return parent? this.mapToDomain( parent) :null;
    }

    async update(id: string, data: Partial<Parent>): Promise<Parent | null> {
        const updated = await ParentModel.findByIdAndUpdate(id, data, {
            new: true
        });
        return updated? this.mapToDomain(updated) : null;
    }

    async updateRefreshToken(parentId: string, token: string): Promise<void> {
        await ParentModel.findByIdAndUpdate(parentId,{
            refreshToken: token
        });
    }

    private mapToDomain(doc:any): Parent {
        return {
            id:doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            isBlocked: doc.isBlocked,
            childrenIds: doc.childrenIds?.map( (id:any) => id.toString()),
            createdAt: doc.createdAt
        };
    }
}