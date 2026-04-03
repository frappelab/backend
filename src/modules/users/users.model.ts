import { ObjectId } from 'mongodb';

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role?: "admin" | "user";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}