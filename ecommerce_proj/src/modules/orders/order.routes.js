import { Router } from "express";
import { authenticate } from "../../shared/middlewares/authenticate.js";
import { validate } from "../../shared/middlewares/validate.js";
import { createOrder, getOrder, listOrders } from "./order.controller.js";
import { createOrderSchema, orderIdSchema } from "./order.validator.js";

const router = Router();

router.use(authenticate);
router.post("/", validate(createOrderSchema), createOrder);
router.get("/", listOrders);
router.get("/:id", validate(orderIdSchema), getOrder);

export default router;
