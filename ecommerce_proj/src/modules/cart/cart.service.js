import { prisma } from "../../config/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";
import { cartRepository } from "./cart.repository.js";

export const cartService = {
  get(userId) {
    return cartRepository.getOrCreate(userId);
  },

  async addItem(userId, productId, quantity) {
    const product = await prisma.product.findFirst({
      where: { id: productId, isActive: true },
    });

    if (!product) throw new AppError(404, "Product not found");
    if (product.stock < quantity) throw new AppError(400, "Insufficient stock");

    return cartRepository.addItem(userId, productId, quantity);
  },

  async updateItem(userId, itemId, quantity) {
    const cart = await cartRepository.getOrCreate(userId);
    const item = cart.items.find((cartItem) => cartItem.id === itemId);

    if (!item) throw new AppError(404, "Cart item not found");
    if (item.product.stock < quantity) throw new AppError(400, "Insufficient stock");

    return cartRepository.updateItem(itemId, quantity);
  },

  async removeItem(userId, itemId) {
    const cart = await cartRepository.getOrCreate(userId);
    const itemExists = cart.items.some((item) => item.id === itemId);

    if (!itemExists) throw new AppError(404, "Cart item not found");
    await cartRepository.deleteItem(itemId);
  },
};
