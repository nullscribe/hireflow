import { Router } from "express";
import { container } from "tsyringe";
import CandidateController from "../controllers/candidate.controller.js";
import { authHandler } from "../middlewares/authHandler.js";

const candidateRouter = Router();

const candidateController = container.resolve(CandidateController);

candidateRouter.get("/profile", authHandler, candidateController.handleGetProfile);

export default candidateRouter;
