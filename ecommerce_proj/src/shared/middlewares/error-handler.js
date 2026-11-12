import { Prisma } from "@prisma/client";
import { env } from "../../config/env.js";
import { AppError } from "../errors/app-error.js";

export const notFound = (req, _res, next) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let message = "Internal server error";
  let details;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 409;
      message = "A record with this value already exists";
    } else if (error.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    } else if (error.code === "P2003") {
      statusCode = 400;
      message = "The request references a related record that does not exist";
    }
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(env.NODE_ENV !== "production" && statusCode === 500
      ? { stack: error instanceof Error ? error.stack : undefined }
      : {}),
  });
};
