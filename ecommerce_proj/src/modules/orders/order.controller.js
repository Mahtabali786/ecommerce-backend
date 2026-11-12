import { asyncHandler } from "../../shared/utils/async-handler.js";
import { orderService } from "./order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.create(req.user.userId);
  res.status(201).json({ success: true, data: order });
});

export const listOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.list(req.user.userId);
  res.json({ success: true, data: orders });
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getById(
    res.locals.validated.params.id,
    req.user.userId,
  );
  res.json({ success: true, data: order });
});
