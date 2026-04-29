import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router();
const _AuthController = new AuthController();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un usuario en el sistema
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Carlos Hernández
 *               email:
 *                 type: string
 *                 example: carlos@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               avatar:
 *                 type: string
 *                 example: https://api.dicebear.com/9.x/lorelei/svg
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/register',_AuthController.register);


/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y retorna un token JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 69ce972368c3da11056d6667
 *                     name:
 *                       type: string
 *                       example: Carlos Hernández
 *                     email:
 *                       type: string
 *                       example: carlos@test.com
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login',_AuthController.login);

export default router;