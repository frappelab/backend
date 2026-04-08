import { ObjectId } from "mongodb";
import { TasksRepository } from "./tasks.repository";
import { Task, Subtask } from "./tasks.model";
import { CreateTaskDto } from "./tasks.schema";

export class TasksService {
  private readonly repository = new TasksRepository();

  async create(data: CreateTaskDto, userId: string): Promise<Task> {
    const now = new Date();

    const subtasks: Subtask[] = (data.subtasks ?? []).map((subtask) => ({
      _id: new ObjectId(),
      title: subtask.title,
      isDone: subtask.isDone ?? false,
      assignedTo: subtask.assignedTo ? new ObjectId(subtask.assignedTo) : undefined,
    }));

    const task: Task = {
      title: data.title,
      description: data.description,
      projectId: new ObjectId(data.projectId),
      assignedTo: data.assignedTo ? new ObjectId(data.assignedTo) : undefined,
      createdBy: new ObjectId(userId),
      status: data.status ?? "pending",
      priority: data.priority ?? "medium",
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      subtasks,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return await this.repository.create(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.findAll();
  }

  async findById(taskId: string): Promise<Task> {
    const task = await this.repository.findById(taskId);

    if (!task) {
      throw new Error("La tarea no existe");
    }

    return task;
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return await this.repository.findByProject(projectId);
  }

  async findByUser(userId: string): Promise<Task[]> {
    return await this.repository.findByUser(userId);
  }

  async delete(taskId: string): Promise<void> {
    const task = await this.repository.findById(taskId);

    if (!task) {
      throw new Error("La tarea no existe");
    }

    await this.repository.delete(taskId);
  }
}