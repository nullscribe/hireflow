import { Router } from "express";
import healthCheckRouter from "./healthCheck.js";

const apiRouter = Router();

apiRouter.use("/healthCheck", healthCheckRouter);

export default apiRouter;
