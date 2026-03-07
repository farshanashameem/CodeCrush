import { IChildRepository } from "../../domain/repositories/IChildRepository";
import { Child } from "../../domain/entities/Child";
import { ChildModel } from "../database/models/ChildModel";

export class MongoChildRepository implements IChildRepository {

    async createChild(child: Child): Promise<Child> {
        const newChild = await ChildModel.create( child );
        return this.mapToDomain(newChild);
    }

    async getChildrenByParentId(parentId: string): Promise<Child[]> {
        const children = await ChildModel.find( { parentId, isDeleted: false });
        return children.map( child => this.mapToDomain( child ));
    }

    async getChildById(parentId: string, childId: string): Promise<Child | null> {
        const child = await ChildModel.findOne({
            _id: childId,
            parentId,
            isDeleted: false
        });

        if (!child) return null;

        return this.mapToDomain(child);
    }

    async updateChild(parentId: string, childId: string, data: Partial<Child>): Promise<Child | null> {
        const updatedChild = await ChildModel.findOneAndUpdate(
            { _id: childId, parentId },
            data,
            { new: true }
        );

        if (!updatedChild) return null;

        return this.mapToDomain(updatedChild);
    }

    async toggleDeleteChild( parentId: string, childId: string): Promise<Child | null > {
        const child = await ChildModel.findOne( { _id:childId, parentId });

        if(!child) return null;
        child.isDeleted = !child.isDeleted;
        await child.save();

        return this.mapToDomain( child );
    }
        

    async toggleBlockChild( parentId: string, childId: string): Promise<Child | null> {
         const child = await ChildModel.findOne( { _id:childId, parentId });

        if(!child) return null;
        child.isBlocked = !child.isBlocked;
        await child.save();

        return this.mapToDomain( child );
    }

    //Mapping inorder to avoid errors when converting objectId to string
    private mapToDomain( doc: any ) : Child {
        return {
            id: doc._id.toString(),
            parentId: doc.parentId.toString(),
            name: doc.name,
            age: doc.age,
            dob: doc.dob,
            avatar: doc.avatar,
            createdAt: doc.createdAt,
            isBlocked: doc.isBlocked,
            isDeleted: doc.isDeleted,

            totalPlayTime:doc.totalPlayTime,
            totalGamesPlayed: doc.totalGamesPlayed,
            lastPlayed: doc.lastPlayed,

            games: doc.games?.map( (game: any ) => ({
                gameId: game.gameId.toString(),
                currentLevel: game.currentLevel,
                currentLevelHighScore: game.currentLevelHighScore,
                averageScore: game.averageScore,
                lastPlayedAt: game.lastPlayedAt
            })) || []
        };
    }
}