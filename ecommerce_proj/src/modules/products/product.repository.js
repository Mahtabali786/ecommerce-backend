import { prisma } from "../../config/prisma.js";

export const productRepository = {
  findMany({ where, skip, take }) {
    return Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);
  },

  findById(id) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  },

  create({ name, description, price, stock, categoryId, slug }) {
    return prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        slug,
        category: { connect: { id: categoryId } },
      },
      include: { category: true },
    });
  },

  update(id, data) {
    const { categoryId, ...productData } = data;
    return prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      },
      include: { category: true },
    });
  },
};
