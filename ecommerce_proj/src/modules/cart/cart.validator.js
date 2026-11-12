import { z } from "zod";
export const addCartItemSchema = z.object({
    body: z.object({ productId: z.string().uuid(), quantity: z.coerce.number().int().min(1).max(99) })
});
export const updateCartItemSchema = z.object({
    params: z.object({ itemId: z.string().uuid() }),
    body: z.object({ quantity: z.coerce.number().int().min(1).max(99) })
});
export const removeCartItemSchema = z.object({ params: z.object({ itemId: z.string().uuid() }) });
