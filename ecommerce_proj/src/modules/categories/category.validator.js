import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});
