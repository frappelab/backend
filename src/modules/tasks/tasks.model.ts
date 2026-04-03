import { ObjectId } from 'mongodb';

export type TaskStatus = "pending" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Subtask {
    _id?: ObjectId;
    title: string;
    isDone: boolean;
    assignedTo?: ObjectId;
}

export interface Task {
    _id?: ObjectId;
    title: string;
    description?: string;
    projectId: ObjectId;      // proyecto al que pertenece
    assignedTo?: ObjectId;    // usuario asignado
    createdBy: ObjectId;      // quien creó la tarea
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    subtasks: Subtask[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}