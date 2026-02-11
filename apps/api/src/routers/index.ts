import { Router } from "express";
import healthCheckRouter from "./healthCheck.route.js";
import authRouter from "./auth.route.js";
import jobRouter from "./jobs.route.js";
import employerRouter from "./employer.route.js";

const apiRouter = Router();

apiRouter.use("/healthCheck", healthCheckRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/jobs", jobRouter);
apiRouter.use("/employers", employerRouter);

export default apiRouter;
