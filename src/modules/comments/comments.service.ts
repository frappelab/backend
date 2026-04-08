import { ObjectId } from "mongodb";
import { CommentsRepository } from "./comments.repository";
import { Comment } from "./comments.model";
import { CreateCommentDto } from "./comments.schema";

export class CommentsService {
  private readonly repository = new CommentsRepository();

  async create(data: CreateCommentDto, userId: string): Promise<Comment> {
    const now = new Date();

    const comment: Comment = {
      taskId: new ObjectId(data.taskId),
      authorId: new ObjectId(userId),
      message: data.message,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return await this.repository.create(comment);
  }

  async findByTask(taskId: string): Promise<Comment[]> {
    return await this.repository.findByTask(taskId);
  }

  async delete(commentId: string): Promise<void> {
    const comment = await this.repository.findById(commentId);

    if (!comment) {
      throw new Error("El comentario no existe");
    }

    await this.repository.delete(commentId);
  }
}