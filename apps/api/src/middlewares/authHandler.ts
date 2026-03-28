import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { BadRequestError } from "@hireflow/types";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      throw new BadRequestError("No token provided");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    req.user = decoded;

    next();
  } catch (_error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
