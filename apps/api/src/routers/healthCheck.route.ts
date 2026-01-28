import { Router } from "express";
import { container } from "tsyringe";

import HealthCheckController from "../controllers/healthCheck.controller.js";

const healthCheckRouter = Router();

const healthCheckController = container.resolve(HealthCheckController);

healthCheckRouter.get("/", healthCheckController.handleHealthCheck);

export default healthCheckRouter;
