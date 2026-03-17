export interface Admin {
    id?: string,
    name: string;
    email: string,
    password: string,
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}