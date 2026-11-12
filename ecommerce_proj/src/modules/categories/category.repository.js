import { prisma } from "../../config/prisma.js";

export const categoryRepository = {
  findMany() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, createdAt: true },
    });
  },

  findById(id) {
    return prisma.category.findUnique({ where: { id } });
  },

  create(data) {
    return prisma.category.create({ data });
  },
};
