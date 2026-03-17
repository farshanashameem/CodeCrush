import { IChildRepository } from "../../domain/repositories/IChildRepository";
import { Child } from "../../domain/entities/Child";
import { ChildModel } from "../database/models/ChildModel";
import { ParentModel } from "../database/models/ParentModel";
export class MongoChildRepository implements IChildRepository {

    async createChild(child: Child): Promise<Child> {
        const newChild = await ChildModel.create( child );
        //  Push the child ID to the parent
    await ParentModel.findByIdAndUpdate(
        child.parentId,                // parent ID from child
        { $addToSet: { childrenIds: newChild._id } }, // add without duplicates
        { new: true }
    );
        return this.mapToDomain(newChild);
    }

    async getChildrenByParentId(parentId: string): Promise<Child[]> {
        const children = await ChildModel.find( { parentId });
        return children.map( child => this.mapToDomain( child ));
    }

    async getChildById(parentId: string, childId: string): Promise<Child | null> {
        const child = await ChildModel.findOne({
            _id: childId,
            parentId
           
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

// Toggle Delete
async toggleDeleteChild(parentId: string, childId: string): Promise<Child> {
    const child = await ChildModel.findOne({ _id: childId, parentId });

    if (!child) throw new Error("Child not found");

    child.isDeleted = !child.isDeleted;
    await child.save();

    return this.mapToDomain(child);
}

// Toggle Block
async toggleBlockChild(parentId: string, childId: string): Promise<Child> {
    const child = await ChildModel.findOne({ _id: childId, parentId });

    if (!child) throw new Error("Child not found");

    child.isBlocked = !child.isBlocked;
    await child.save();

    return this.mapToDomain(child);
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