import { prisma } from "../../config/prisma.js";

export const cartRepository = {
  findByUserId(userId) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  },

  getOrCreate(userId) {
    return prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: { items: { include: { product: true } } },
    });
  },

  addItem(userId, productId, quantity) {
    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      return tx.cartItem.upsert({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
        update: { quantity: { increment: quantity } },
        create: { cartId: cart.id, productId, quantity },
        include: { product: true },
      });
    });
  },

  updateItem(itemId, quantity) {
    return prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true },
    });
  },

  deleteItem(itemId) {
    return prisma.cartItem.delete({ where: { id: itemId } });
  },
};
