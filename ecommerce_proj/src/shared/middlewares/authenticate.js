import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { AppError } from "../errors/app-error.js";
export const authenticate = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer "))
        return next(new AppError(401, "Authentication required"));
    try {
        req.user = jwt.verify(header.slice(7), env.JWT_ACCESS_SECRET);
        next();
    }
    catch {
        next(new AppError(401, "Invalid or expired access token"));
    }
};
export const authorize = (...roles) => (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role))
        return next(new AppError(403, "Forbidden"));
    next();
};
