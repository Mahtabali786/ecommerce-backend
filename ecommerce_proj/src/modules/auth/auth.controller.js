import { asyncHandler } from "../../shared/utils/async-handler.js";
import { authService } from "./auth.service.js";
export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, message: "Account created", data: result });
});
export const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.json({ success: true, message: "Login successful", data: result });
});
