import { asyncHandler } from "../../shared/utils/async-handler.js";
import { userService } from "./user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: await userService.getProfile(req.user.userId),
  });
});

export const listUsers = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: await userService.list(res.locals.validated.query),
  });
});
