import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { AppError } from "@hireflow/types";
import { ENVIRONMENT } from "../secrets.js";

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error({
    name: error.name,
    message: error.message,
    ...(ENVIRONMENT !== "production" ? { stack: error.stack } : {}),
  });

  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  } else if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}
