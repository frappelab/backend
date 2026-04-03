import { ObjectId } from "mongodb";
import { ProjectsRepository } from "./projects.repository";
import { Projects } from "./projects.model";
import { CreateProjectDto } from "./projects.schema";

export class ProjectsService {
  private readonly repository = new ProjectsRepository();

  async create(data: CreateProjectDto, userId: string): Promise<Projects> {
    const now = new Date();
    const ownerId = new ObjectId(userId);

    const project: Projects = {
      name: data.name,
      description: data.description,
      owner: ownerId,
      members: [ownerId],
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return await this.repository.create(project);
  }

  async findAll(): Promise<Projects[]> {
    return await this.repository.findAll();
  }

  async findById(projectId: string): Promise<Projects> {
    const project = await this.repository.findById(projectId);

    if (!project) {
      throw new Error("El proyecto no existe");
    }

    return project;
  }

  async findByUser(userId: string): Promise<Projects[]> {
    return await this.repository.findByUser(userId);
  }

  async delete(projectId: string): Promise<void> {
    const project = await this.repository.findById(projectId);

    if (!project) {
      throw new Error("El proyecto no existe");
    }

    await this.repository.delete(projectId);
  }
}