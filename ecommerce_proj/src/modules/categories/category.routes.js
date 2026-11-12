import { Router } from "express";
import { authenticate, authorize } from "../../shared/middlewares/authenticate.js";
import { validate } from "../../shared/middlewares/validate.js";
import {
  createCategory,
  getCategory,
  listCategories,
} from "./category.controller.js";
import {
  categoryIdSchema,
  createCategorySchema,
} from "./category.validator.js";

const router = Router();

router.get("/", listCategories);
router.get("/:id", validate(categoryIdSchema), getCategory);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createCategorySchema),
  createCategory,
);

export default router;
