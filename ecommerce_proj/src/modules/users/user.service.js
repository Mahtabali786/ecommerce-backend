import { AppError } from "../../shared/errors/app-error.js";
import { userRepository } from "./user.repository.js";

export const userService = {
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError(404, "User not found");
    return user;
  },

  async list(query) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await userRepository.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
