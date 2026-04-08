import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener mínimo 3 caracteres")
    .max(100, "El título es muy largo"),

  description: z
    .string()
    .max(500, "La descripción es muy larga")
    .optional(),

  projectId: z.string().min(1, "El projectId es obligatorio"),

  assignedTo: z.string().optional(),

  status: z
    .enum(["pending", "in_progress", "review", "done"])
    .optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .optional(),

  dueDate: z.string().datetime("La fecha debe tener formato ISO").optional(),

  subtasks: z.array(
    z.object({
      title: z
        .string()
        .min(1, "El título de la subtarea es obligatorio")
        .max(100, "El título de la subtarea es muy largo"),
      isDone: z.boolean().optional(),
      assignedTo: z.string().optional(),
    })
  ).optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;