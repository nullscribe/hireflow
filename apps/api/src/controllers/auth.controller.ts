import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import {
  type AuthResponse,
  type RegisterDTO,
  type LoginDTO,
  BadRequestError,
  LoginSchema,
  RegistrationSchema,
} from "@hireflow/types";
import AuthRepository from "../repositories/auth.repo.js";

@singleton()
export default class AuthController {
  constructor(private readonly authRepo: AuthRepository) {}

  handleLogin = async (
    req: Request<Record<string, never>, AuthResponse, LoginDTO>,
    res: Response<AuthResponse>,
  ) => {
    const { email, password } = LoginSchema.parse(req.body);
    const result = await this.authRepo.login({ email, password } as LoginDTO);
    if (result === null) {
      throw new BadRequestError("Invalid email or password");
    }
    res.json(result);
  };

  handleRegistration = async (
    req: Request<Record<string, never>, AuthResponse, RegisterDTO>,
    res: Response<AuthResponse>,
  ) => {
    const { name, email, password } = RegistrationSchema.parse(req.body);
    const result = await this.authRepo.register({ name, email, password } as RegisterDTO);
    res.json(result);
  };
}
