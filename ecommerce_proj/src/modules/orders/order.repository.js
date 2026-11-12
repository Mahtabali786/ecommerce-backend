import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";

export const orderRepository = {
  createFromCart(userId) {
    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        throw new AppError(400, "Your cart is empty");
      }

      let total = new Prisma.Decimal(0);

      for (const item of cart.items) {
        const lineTotal = new Prisma.Decimal(item.product.price).mul(item.quantity);
        total = total.add(lineTotal);

        // Conditional decrement prevents stock from becoming negative when
        // multiple checkouts attempt to buy the same product concurrently.
        const inventoryUpdate = await tx.product.updateMany({
          where: {
            id: item.productId,
            isActive: true,
            stock: { gte: item.quantity },
          },
          data: { stock: { decrement: item.quantity } },
        });

        if (inventoryUpdate.count !== 1) {
          throw new AppError(
            409,
            `Product "${item.product.name}" is unavailable in the requested quantity`,
          );
        }
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              productName: item.product.name,
              unitPrice: item.product.price,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });
  },

  findForUser(id, userId) {
    return prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });
  },

  listForUser(userId) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  },
};
