import { Prisma } from "@prisma/client";
import { AppError } from "../../shared/errors/app-error.js";
import { slugify } from "../../shared/utils/slug.js";
import { productRepository } from "./product.repository.js";

export const productService = {
  async list(query) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where = {
      isActive: true,
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.search
        ? { name: { contains: query.search, mode: "insensitive" } }
        : {}),
    };

    const [items, total] = await productRepository.findMany({
      where,
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

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product || !product.isActive) {
      throw new AppError(404, "Product not found");
    }
    return product;
  },

  create(input) {
    return productRepository.create({
      ...input,
      price: new Prisma.Decimal(input.price),
      slug: `${slugify(input.name)}-${crypto.randomUUID().slice(0, 8)}`,
    });
  },

  async update(id, input) {
    await this.getById(id);

    const data = {
      ...input,
      ...(input.price !== undefined
        ? { price: new Prisma.Decimal(input.price) }
        : {}),
    };

    return productRepository.update(id, data);
  },
};
