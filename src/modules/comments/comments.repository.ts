import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Comment } from "./comments.model";

export class CommentsRepository {
  private collection() {
    return getDb().collection<Comment>("comments");
  }

  async create(data: Comment): Promise<Comment> {
    const result = await this.collection().insertOne(data);

    return {
      _id: result.insertedId,
      ...data,
    };
  }

  async findByTask(taskId: string): Promise<Comment[]> {
    return await this.collection()
      .find({
        taskId: new ObjectId(taskId),
        isActive: true,
      })
      .sort({ createdAt: 1 })
      .toArray();
  }

  async findById(id: string): Promise<Comment | null> {
    return await this.collection().findOne({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  async delete(commentId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );
  }
}