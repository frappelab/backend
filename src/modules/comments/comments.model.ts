import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  taskId: ObjectId;
  authorId: ObjectId;
  message: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}