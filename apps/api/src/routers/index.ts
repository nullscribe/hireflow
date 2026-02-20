import { Router, type NextFunction, type Request, type Response } from "express";
import healthCheckRouter from "./healthCheck.route.js";
import authRouter from "./auth.route.js";
import jobRouter from "./jobs.route.js";
import employerRouter from "./employer.route.js";
import candidateRouter from "./candidate.route.js";
import type { ErrorResponse } from "@hireflow/types";

const apiRouter = Router();

apiRouter.use("/healthCheck", healthCheckRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/jobs", jobRouter);
apiRouter.use("/employers", employerRouter);
apiRouter.use("/candidates", candidateRouter);

apiRouter.use((_req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  res.status(404).json({ error: "Resource not found" });
});

export default apiRouter;
