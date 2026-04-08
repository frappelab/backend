import { z } from "zod";

export const createCommentSchema = z.object({
  taskId: z.string().min(1, "taskId es obligatorio"),

  message: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(1000, "El comentario es muy largo"),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;