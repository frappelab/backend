import { Router } from "express";
import { TasksController } from "./tasks.controller";
import { createTaskSchema } from "./tasks.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const tasksController = new TasksController();

router.post("/", authMiddleware, validate(createTaskSchema), tasksController.create);
router.get("/", authMiddleware, tasksController.findAll);
router.get("/me", authMiddleware, tasksController.findByUser);
router.get("/project/:projectId", authMiddleware, tasksController.findByProject);
router.get("/:id", authMiddleware, tasksController.findById);
router.delete("/:id", authMiddleware, tasksController.delete);

export default router;