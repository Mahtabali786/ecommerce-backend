import { AppError } from "../../shared/errors/app-error.js";
import { orderRepository } from "./order.repository.js";

export const orderService = {
  create(userId) {
    return orderRepository.createFromCart(userId);
  },

  list(userId) {
    return orderRepository.listForUser(userId);
  },

  async getById(id, userId) {
    const order = await orderRepository.findForUser(id, userId);
    if (!order) throw new AppError(404, "Order not found");
    return order;
  },
};
