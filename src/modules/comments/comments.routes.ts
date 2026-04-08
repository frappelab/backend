import { Router } from "express";
import { CommentsController } from "./comments.controller";
import { createCommentSchema } from "./comments.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const commentsController = new CommentsController();

router.post("/", authMiddleware, validate(createCommentSchema),commentsController.create);
router.get("/task/:taskId",authMiddleware,commentsController.findByTask);
router.delete("/:id",authMiddleware,commentsController.delete);

export default router;