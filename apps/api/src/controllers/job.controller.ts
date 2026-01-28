import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import JobRepository from "../repositories/job.repo.js";
import type {
  BasicApiResponse,
  ErrorResponse,
  JobDetailResponse,
  JobListResponse,
  SavedJobsResponse
} from "@hireflow/types";
import type { AuthRequest } from "../middlewares/authHandler.js";

@singleton()
export default class JobController {
  constructor(private readonly jobRepo: JobRepository) {}

  handleGetAllJobs = async (_req: Request, res: Response<JobListResponse | ErrorResponse>) => {
    try {
      const jobs = await this.jobRepo.getAll();
      res.json({ jobs });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  handleGetById = async (req: Request, res: Response<JobDetailResponse | ErrorResponse>) => {
    try {
      const id = req.params["id"];
      if (id === undefined || isNaN(+id)) {
        throw new Error("Invalid id");
      }
      const job = await this.jobRepo.getById(+id);
      res.json({ job });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  handleJobSave = async (req: AuthRequest, res: Response<BasicApiResponse | ErrorResponse>) => {
    try {
      const id = req.params["id"];
      const candidateId = req.user?.userId;
      if (id === undefined || isNaN(+id) || candidateId === undefined || isNaN(candidateId)) {
        throw new Error("Invalid id");
      }
      await this.jobRepo.saveJob(+id, candidateId);
      res.json({ message: "Job Saved Successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  handleGetSavedJobs = async (
    req: AuthRequest,
    res: Response<SavedJobsResponse | ErrorResponse>
  ) => {
    try {
      const candidateId = req.user?.userId;
      if (candidateId === undefined) {
        throw new Error("Something bad happened");
      }
      const jobs = await this.jobRepo.getSavedJob(candidateId);
      res.json({ jobs });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
