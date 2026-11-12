import { AppError } from "../../shared/errors/app-error.js";
import { categoryRepository } from "./category.repository.js";

export const categoryService = {
  list() {
    return categoryRepository.findMany();
  },

  async getById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new AppError(404, "Category not found");
    return category;
  },

  create(input) {
    return categoryRepository.create(input);
  },
};
