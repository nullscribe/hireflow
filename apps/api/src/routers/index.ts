import { Router, type NextFunction, type Request, type Response } from "express";
import healthCheckRouter from "./healthCheck.route.js";
import authRouter from "./auth.route.js";
import jobRouter from "./jobs.route.js";
import employerRouter from "./employer.route.js";
import candidateRouter from "./candidate.route.js";
import { NotFoundError } from "@hireflow/types";
import errorHandler from "../middlewares/errorHandler.js";

const apiRouter = Router();

apiRouter.use("/healthCheck", healthCheckRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/jobs", jobRouter);
apiRouter.use("/employers", employerRouter);
apiRouter.use("/candidates", candidateRouter);

apiRouter.use((_req: Request, _res: Response, _next: NextFunction) => {
  throw new NotFoundError("Endpoint not found");
});

apiRouter.use(errorHandler);

export default apiRouter;
