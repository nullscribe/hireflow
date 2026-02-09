import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import type { AuthResponse, RegisterDTO, LoginDTO, ErrorResponse } from "@hireflow/types";
import AuthRepository from "../repositories/auth.repo.js";

@singleton()
export default class AuthController {
  constructor(private readonly authRepo: AuthRepository) {}

  handleLogin = async (
    req: Request<Record<string, never>, AuthResponse | ErrorResponse, LoginDTO>,
    res: Response<AuthResponse | ErrorResponse>,
  ) => {
    try {
      const { email, password } = req.body;
      const result = await this.authRepo.login({ email, password } as LoginDTO);
      res.json(result);
    } catch (error: unknown) {
      let message = "Internal Server Error";
      let status = 500;

      if (error instanceof Error) {
        message = error.message;
        status = 401;
      }

      res.status(status).json({ error: message });
    }
  };

  handleRegistration = async (
    req: Request<Record<string, never>, AuthResponse | ErrorResponse, RegisterDTO>,
    res: Response<AuthResponse | ErrorResponse>,
  ) => {
    try {
      const { name, email, password } = req.body;

      const result = await this.authRepo.register({ name, email, password } as RegisterDTO);

      res.json(result);
    } catch (error: unknown) {
      let message = "Internal Server Error";
      let status = 500;

      if (error instanceof Error) {
        message = error.message;
        status = 400;
      }

      res.status(status).json({ error: message });
    }
  };
}
