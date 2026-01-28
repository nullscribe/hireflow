import { Router } from "express";
import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

const authController = container.resolve(AuthController);

authRouter.post("/login", authController.handleLogin);

authRouter.post("/register", authController.handleRegistration);

export default authRouter;
