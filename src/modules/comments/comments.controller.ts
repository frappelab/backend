import { Request, Response, NextFunction } from "express";
import { CommentsService } from "./comments.service";
import { createCommentSchema } from "./comments.schema";

export class CommentsController {
    private readonly commentsService = new CommentsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createCommentSchema.parse(req.body);
            const userId = (req as any).user?.sub;

            if (!userId) {
                return res.status(401).json({
                    message: "Usuario no autenticado",
                });
            }

            const comment = await this.commentsService.create(data, userId);

            return res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    };

    findByTask = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const taskId = req.params.taskId as string;
            const comments = await this.commentsService.findByTask(taskId);

            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;

            await this.commentsService.delete(id);

            return res.status(200).json({
                message: "Comentario eliminado correctamente",
            });
        } catch (error) {
            next(error);
        }
    };
}