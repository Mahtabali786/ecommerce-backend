import { z } from "zod";
export const createOrderSchema = z.object({ body: z.object({}) });
export const orderIdSchema = z.object({ params: z.object({ id: z.string().uuid() }) });
