import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .max(100, "El nombre es muy largo"),

  description: z
    .string()
    .max(500, "La descripción es muy larga")
    .optional()
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;