import { prisma } from "../../config/prisma.js";

export const authRepository = {
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  createUser({ name, email, passwordHash }) {
    return prisma.user.create({
      data: { name, email, passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },
};
