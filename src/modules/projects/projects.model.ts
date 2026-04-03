import { ObjectId } from 'mongodb';

export interface Projects {
    _id?: ObjectId;
    name: string;
    description?: string;
    owner: ObjectId;          // user que creó el proyecto
    members: ObjectId[];      // usuarios del proyecto
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}