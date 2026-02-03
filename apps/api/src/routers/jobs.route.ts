import { Router } from "express";
import { container } from "tsyringe";
import JobController from "../controllers/job.controller.js";
import { authHandler } from "../middlewares/authHandler.js";

const jobRouter = Router();

const jobController = container.resolve(JobController);

jobRouter.get("/", jobController.handleGetAllJobs);
jobRouter.get("/saved", authHandler, jobController.handleGetSavedJobs);
jobRouter.get("/countries", jobController.handleGetCountryJobCount);
jobRouter.get("/categories", jobController.handleGetCategoriesJobCount);
jobRouter.get("/featured", jobController.handleGetFeatured);
jobRouter.get("/recent", jobController.handleGetRecent);
jobRouter.get("/:id", jobController.handleGetById);
jobRouter.post("/:id/save", authHandler, jobController.handleJobSave);

export default jobRouter;
