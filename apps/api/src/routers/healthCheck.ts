import { Router } from "express";
import { container } from "tsyringe";

import HealthCheckController from "../controllers/healthCheck.js";

const healthCheckRouter = Router();

const healthCheckController = container.resolve(HealthCheckController);

healthCheckRouter.get("/", healthCheckController.healthCheck);

export default healthCheckRouter;
