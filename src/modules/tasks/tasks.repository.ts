import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Task } from "./tasks.model";

export class TasksRepository {
  private collection() {
    return getDb().collection<Task>("tasks");
  }

  async create(data: Task): Promise<Task> {
    const result = await this.collection().insertOne(data);

    return {
      _id: result.insertedId,
      ...data,
    };
  }

  async findAll(): Promise<Task[]> {
    return await this.collection()
      .find({ isActive: true })
      .toArray();
  }

  async findById(id: string): Promise<Task | null> {
    return await this.collection().findOne({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return await this.collection()
      .find({
        projectId: new ObjectId(projectId),
        isActive: true,
      })
      .toArray();
  }

  async findByUser(userId: string): Promise<Task[]> {
    return await this.collection()
      .find({
        assignedTo: new ObjectId(userId),
        isActive: true,
      })
      .toArray();
  }

  async update(taskId: string, data: Partial<Task>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(taskId), isActive: true },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );
  }

  async delete(taskId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );
  }
}