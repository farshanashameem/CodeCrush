import { IChildRepository } from "../../domain/repositories/IChildRepository";
import { Child } from "../../domain/entities/Child";
import { ChildModel } from "../database/models/ChildModel";

export class MongoChildRepository implements IChildRepository {

    async createChild(child: Child): Promise<Child> {
        const newChild = await ChildModel.create( child );
        return this.mapToDomain(newChild);
    }

    async getChildrenByParentId(parentId: string): Promise<Child[]> {
        const children = await ChildModel.find( { parentId });
        return children.map( child => this.mapToDomain( child ));
    }

    async getChildById(childId: string): Promise<Child | null> {
        const child = await ChildModel.findById( childId );
        if(!child) return null;
        return this.mapToDomain( child );
    }

    async updateChild(childId: string, data: Partial<Child>): Promise<Child | null> {
        const updatedChild = await ChildModel.findByIdAndUpdate( childId, data, { new: true });
        if(!updatedChild) return null;
        return this.mapToDomain( updatedChild );
    }

    async deleteChild(childId: string): Promise<void> {
         await ChildModel.findByIdAndDelete( childId );
    }

    async blockChild(childId: string): Promise<void> {
         await ChildModel.findByIdAndUpdate(childId, {$set : { isBlocked: true }});
    }

    //Mapping inorder to avoid errors when converting objectId to string
    private mapToDomain( doc: any ) : Child {
        return {
            id: doc._id.toString(),
            parentId: doc.parentId.toString(),
            name: doc.name,
            age: doc.age,
            avatar: doc.avatar,
            createdAt: doc.createdAt,
            isBlocked: doc.isBlocked,

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