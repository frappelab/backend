import { Router } from "express";
import { ProjectsController } from "./projects.controller";
import { createProjectSchema } from "./projects.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const projectsController = new ProjectsController();

router.post("/", authMiddleware, validate(createProjectSchema), projectsController.create);
router.get("/", authMiddleware, projectsController.findAll);
router.get("/me", authMiddleware, projectsController.findByUser);
router.get("/:id", authMiddleware, projectsController.findById);
router.delete("/:id", authMiddleware, projectsController.delete);

export default router;