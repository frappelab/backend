import { Request, Response, NextFunction } from "express";
import { TasksService } from "./tasks.service";
import { createTaskSchema } from "./tasks.schema";

export class TasksController {
    private readonly tasksService = new TasksService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createTaskSchema.parse(req.body);
            const userId = (req as any).user?.sub;

            if (!userId) {
                return res.status(401).json({
                    message: "Usuario no autenticado",
                });
            }

            const task = await this.tasksService.create(data, userId);

            return res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = await this.tasksService.findAll();
            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const task = await this.tasksService.findById(id);

            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    };

    findByProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId as string;
            const tasks = await this.tasksService.findByProject(projectId);

            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    };

    findByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;

            if (!userId) {
                return res.status(401).json({
                    message: "Usuario no autenticado",
                });
            }

            const tasks = await this.tasksService.findByUser(userId);

            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;

            await this.tasksService.delete(id);

            return res.status(200).json({
                message: "Tarea eliminada correctamente",
            });
        } catch (error) {
            next(error);
        }
    };
}