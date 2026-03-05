export interface Parent {
    id?: string;
    name: string;
    email: string;
    password: string;
    isBlocked: boolean;
    childrenIds: string[];
    createdAt?: Date;
    refreshToken?: string;
}