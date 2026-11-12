import { asyncHandler } from "../../shared/utils/async-handler.js";
import { productService } from "./product.service.js";

export const listProducts = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: await productService.list(res.locals.validated.query),
  });
});

export const getProduct = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: await productService.getById(res.locals.validated.params.id),
  });
});

export const createProduct = asyncHandler(async (_req, res) => {
  res.status(201).json({
    success: true,
    data: await productService.create(res.locals.validated.body),
  });
});

export const updateProduct = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: await productService.update(
      res.locals.validated.params.id,
      res.locals.validated.body,
    ),
  });
});
