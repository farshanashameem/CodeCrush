import { ChildGame } from "./ChildGame";

export interface Child {
    id?: string;
    parentId: string;
    name: string;
    age: number;
    dob?: Date;
    avatar: string;
    createdAt?: Date;
    isBlocked?: boolean;
    isDeleted?: boolean;

    totalPlayTime?: number;
    totalGamesPlayed?: number;
    lastPlayed?: Date;
    games?: ChildGame[];
}