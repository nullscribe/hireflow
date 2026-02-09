import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import JobRepository from "../repositories/job.repo.js";
import type {
  BasicApiResponse,
  CountryJobsResponse,
  CategoryJobsResponse,
  ErrorResponse,
  JobDetailResponse,
  JobFilters,
  JobListResponse,
  JobResponse,
} from "@hireflow/types";
import type { AuthRequest } from "../middlewares/authHandler.js";

@singleton()
export default class JobController {
  constructor(private readonly jobRepo: JobRepository) {}

  handleGetAllJobs = async (req: Request, res: Response<JobListResponse | ErrorResponse>) => {
    try {
      const filters: JobFilters = {};

      if (req.query.country) filters.country = req.query.country as string;
      if (req.query.industry) filters.industry = req.query.industry as string;
      if (req.query.jobType) filters.jobType = req.query.jobType as JobResponse["jobType"];
      if (req.query.experienceLevel)
        filters.experienceLevel = req.query.experienceLevel as JobResponse["experienceLevel"];
      if (req.query.location) filters.location = req.query.location as string;
      if (req.query.salaryMin) filters.salaryMin = Number(req.query.salaryMin);
      if (req.query.salaryMax) filters.salaryMax = Number(req.query.salaryMax);
      if (req.query.limit) filters.limit = Number(req.query.limit);
      if (req.query.offset) filters.offset = Number(req.query.offset);
      if (req.query.search) filters.search = req.query.search as string;

      const jobs = await this.jobRepo.getAll(filters);
      res.json({ jobs });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
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
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
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
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };

  handleGetSavedJobs = async (req: AuthRequest, res: Response<JobListResponse | ErrorResponse>) => {
    try {
      const candidateId = req.user?.userId;
      if (candidateId === undefined) {
        throw new Error("Something bad happened");
      }
      const jobs = await this.jobRepo.getSavedJob(candidateId);
      res.json({ jobs });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };

  handleGetCountryJobCount = async (
    _req: Request,
    res: Response<CountryJobsResponse | ErrorResponse>,
  ) => {
    try {
      const countryByJobCount = await this.jobRepo.getCountryGroup();
      res.status(200).json({ countries: countryByJobCount });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };

  handleGetCategoriesJobCount = async (
    _req: Request,
    res: Response<CategoryJobsResponse | ErrorResponse>,
  ) => {
    try {
      const categoryByJobCount = await this.jobRepo.getCategoryGroup();
      res.json({ categories: categoryByJobCount });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };

  handleGetFeatured = async (_req: Request, res: Response<JobListResponse | ErrorResponse>) => {
    try {
      const featured = await this.jobRepo.getFeatured();
      res.json({ jobs: featured });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };

  handleGetRecent = async (_req: Request, res: Response<JobListResponse | ErrorResponse>) => {
    try {
      const featured = await this.jobRepo.getRecent();
      res.json({ jobs: featured });
    } catch (error: unknown) {
      let message = "Internal server error";

      if (error instanceof Error) message = error.message;
      res.status(500).json({ error: message });
    }
  };
}
