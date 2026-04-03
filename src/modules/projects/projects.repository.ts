import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Projects } from "./projects.model";

export class ProjectsRepository {

  private collection() {
    return getDb().collection<Projects>("projects");
  }

  async create(data: Projects): Promise<Projects> {
    const result = await this.collection().insertOne(data);

    return {
      _id: result.insertedId,
      ...data,
    };
  }

  async findById(id: string): Promise<Projects | null> {
    return await this.collection().findOne({
      _id: new ObjectId(id),
    });
  }

  async findAll(): Promise<Projects[]> {
    return await this.collection().find().toArray();
  }

  async findByUser(userId: string): Promise<Projects[]> {
    return await this.collection()
      .find({
        members: new ObjectId(userId),
        isActive: true
      })
      .toArray();
  }

  async addMember(projectId: string, userId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $addToSet: {
          members: new ObjectId(userId),
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );
  }

  async update(projectId: string, data: Partial<Projects>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );
  }

  async delete(projectId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );
  }
}