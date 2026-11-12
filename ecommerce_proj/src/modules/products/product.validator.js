import { z } from "zod";
const uuid = z.string().uuid();
export const listProductsSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
        search: z.string().optional(),
        categoryId: uuid.optional()
    })
});
export const productIdSchema = z.object({ params: z.object({ id: uuid }) });
export const createProductSchema = z.object({
    body: z.object({
        name: z.string().trim().min(2).max(160),
        description: z.string().max(5000).optional(),
        price: z.coerce.number().positive(),
        stock: z.coerce.number().int().min(0),
        categoryId: uuid
    })
});
export const updateProductSchema = z.object({
    params: z.object({ id: uuid }),
    body: z.object({
        name: z.string().trim().min(2).max(160).optional(),
        description: z.string().max(5000).nullable().optional(),
        price: z.coerce.number().positive().optional(),
        stock: z.coerce.number().int().min(0).optional(),
        categoryId: uuid.optional(),
        isActive: z.boolean().optional()
    }).refine((v) => Object.keys(v).length > 0, "At least one field is required")
});
