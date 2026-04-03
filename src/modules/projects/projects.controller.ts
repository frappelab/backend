import { Request, Response, NextFunction } from "express";
import { ProjectsService } from "./projects.service";
import { createProjectSchema } from "./projects.schema";

export class ProjectsController {

    private readonly projectsService = new ProjectsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createProjectSchema.parse(req.body);
            const userId = (req as any).user?.sub;

            if (!userId) {
                return res.status(401).json({
                    message: "Usuario no autenticado",
                });
            }

            const project = await this.projectsService.create(data, userId);

            return res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const projects = await this.projectsService.findAll();
            return res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const project = await this.projectsService.findById(id);

            return res.status(200).json(project);
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

            const projects = await this.projectsService.findByUser(userId);

            return res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;

            await this.projectsService.delete(id);

            return res.status(200).json({
                message: "Proyecto eliminado correctamente",
            });
        } catch (error) {
            next(error);
        }
    };
}