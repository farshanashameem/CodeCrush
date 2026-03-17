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

    async updateRefreshToken(parentId: string, token: string | null ): Promise<void> {
        await ParentModel.findByIdAndUpdate(parentId,{
            refreshToken: token
        });
    }

    async updatePassword(email: string, password: string): Promise<void> {
        await ParentModel.updateOne(
            { email },
            { $set: { password }}
        );
    }

    async getAllParents(): Promise<Parent[]> {
        const parents = await ParentModel.find().exec();
        return parents.map( parent => this.mapToDomain(parent));
    }

    async toggleBlockParent(parentId: string): Promise<Parent | null> {
        
        const parent= await ParentModel.findById( parentId);
        if( ! parent ) return null;
        parent.isBlocked= !parent.isBlocked;
        await parent.save();

        return this.mapToDomain(parent);
    }

    async toggleDeleteParent(parentId: string): Promise<Parent | null> {
        const parent = await ParentModel.findById( parentId );

        if( !parent ) return null;
         parent.isDeleted = !parent.isDeleted;

         await parent.save();

         return this.mapToDomain(parent);
    }

    private mapToDomain(doc:any): Parent {
        return {
            id:doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            isBlocked: doc.isBlocked,
            isDeleted: doc.isDeleted,
            childrenIds: doc.childrenIds?.map( (id:any) => id.toString()),
            createdAt: doc.createdAt
        };
    }
}