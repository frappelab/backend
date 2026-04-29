import { Router } from "express";
import { ProjectsController } from "./projects.controller";
import { createProjectSchema } from "./projects.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const projectsController = new ProjectsController();


/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Crear proyecto
 *     description: Crea un nuevo proyecto (requiere autenticación JWT)
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sistema de Inventario
 *               description:
 *                 type: string
 *                 example: Proyecto para sistema de inventario
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123abc
 *                 name:
 *                   type: string
 *                   example: Sistema de Inventario
 *                 description:
 *                   type: string
 *                   example: Proyecto para sistema de inventario
 *                 userId:
 *                   type: string
 *                   example: 69ce972368c3da11056d6667
 *       401:
 *         description: No autorizado (token inválido o no enviado)
 */
router.post("/", authMiddleware, validate(createProjectSchema), projectsController.create);


/**
 * @openapi
 * /projects:
 *   get:
 *     summary: Obtener proyectos
 *     description: Retorna la lista de proyectos del usuario autenticado
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123abc
 *                   name:
 *                     type: string
 *                     example: Sistema de Inventario
 *                   description:
 *                     type: string
 *                     example: Proyecto para sistema de inventario
 *                   userId:
 *                     type: string
 *                     example: 69ce972368c3da11056d6667
 *       401:
 *         description: No autorizado (token inválido o ausente)
 */
router.get("/", authMiddleware, projectsController.findAll);


router.get("/all/:id", authMiddleware, projectsController.findByIdAll);



/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: Obtener proyecto por ID
 *     description: Retorna un proyecto específico del usuario autenticado
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto
 *         schema:
 *           type: string
 *           example: 69ce981268c3da11056d6668
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 69ce981268c3da11056d6668
 *                 name:
 *                   type: string
 *                   example: Sistema de Inventario
 *                 description:
 *                   type: string
 *                   example: Proyecto para sistema de inventario
 *                 userId:
 *                   type: string
 *                   example: 69ce972368c3da11056d6667
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Proyecto no encontrado
 */
router.get("/me", authMiddleware, projectsController.findByUser);
router.get("/:id", authMiddleware, projectsController.findById);
router.delete("/:id", authMiddleware, projectsController.delete);

export default router;