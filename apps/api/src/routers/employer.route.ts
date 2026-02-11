import { Router } from "express";
import EmployerController from "../controllers/employer.controller.js";
import { container } from "tsyringe";

const employerController = container.resolve(EmployerController);

const employerRouter = Router();

employerRouter.get("/top", employerController.handleGetTop);

export default employerRouter;
