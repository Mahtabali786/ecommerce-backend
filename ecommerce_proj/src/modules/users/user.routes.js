import { Router } from "express";
import { authenticate, authorize } from "../../shared/middlewares/authenticate.js";
import { validate } from "../../shared/middlewares/validate.js";
import { getProfile, listUsers } from "./user.controller.js";
import { listUsersSchema } from "./user.validator.js";

const router = Router();

router.get("/me", authenticate, getProfile);
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(listUsersSchema),
  listUsers,
);

export default router;
