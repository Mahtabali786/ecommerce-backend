import { asyncHandler } from "../../shared/utils/async-handler.js";
import { categoryService } from "./category.service.js";

export const listCategories = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await categoryService.list() });
});

export const getCategory = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: await categoryService.getById(res.locals.validated.params.id),
  });
});

export const createCategory = asyncHandler(async (_req, res) => {
  res.status(201).json({
    success: true,
    data: await categoryService.create(res.locals.validated.body),
  });
});
