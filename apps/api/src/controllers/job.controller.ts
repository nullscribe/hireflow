import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import JobRepository from "../repositories/job.repo.js";
import {
  type BasicApiResponse,
  type CountryJobsResponse,
  type CategoryJobsResponse,
  type JobDetailResponse,
  type JobFilters,
  type JobListResponse,
  type JobResponse,
  BadRequestError,
} from "@hireflow/types";
import type { AuthRequest } from "../middlewares/authHandler.js";

@singleton()
export default class JobController {
  constructor(private readonly jobRepo: JobRepository) {}

  handleGetAllJobs = async (req: Request, res: Response<JobListResponse>) => {
    const filters: JobFilters = {};

    if (req.query.country) filters.country = req.query.country as string;
    if (req.query.industry) filters.industry = req.query.industry as string;
    if (req.query.jobType) filters.jobType = req.query.jobType as JobResponse["jobType"];
    if (req.query.experienceLevel)
      filters.experienceLevel = req.query.experienceLevel as JobResponse["experienceLevel"];
    if (req.query.isFeatured) filters.isFeatured = req.query.isFeatured === "true";
    if (req.query.location) filters.location = req.query.location as string;
    if (req.query.category) filters.category = req.query.category as string;
    if (req.query.salaryMin) filters.salaryMin = Number(req.query.salaryMin);
    if (req.query.salaryMax) filters.salaryMax = Number(req.query.salaryMax);
    if (req.query.limit) filters.limit = Number(req.query.limit);
    if (req.query.offset) filters.offset = Number(req.query.offset);
    if (req.query.search) filters.search = req.query.search as string;

    const jobs = await this.jobRepo.getAll(filters);
    res.json({ jobs });
  };

  handleGetById = async (req: Request, res: Response<JobDetailResponse>) => {
    const id = req.params["id"];
    if (id === undefined || isNaN(+id)) {
      throw new BadRequestError("Invalid id");
    }
    const job = await this.jobRepo.getById(+id);
    res.json({ job });
  };

  handleJobSave = async (req: AuthRequest, res: Response<BasicApiResponse>) => {
    const id = req.params["id"];
    const candidateId = req.user?.userId;
    if (id === undefined || isNaN(+id) || candidateId === undefined || isNaN(candidateId)) {
      throw new BadRequestError("Invalid id");
    }
    await this.jobRepo.saveJob(+id, candidateId);
    res.json({ message: "Job Saved Successfully" });
  };

  handleGetSavedJobs = async (req: AuthRequest, res: Response<JobListResponse>) => {
    const candidateId = req.user?.userId;
    if (candidateId === undefined) {
      throw new BadRequestError("User authentication context is missing");
    }
    const jobs = await this.jobRepo.getSavedJob(candidateId);
    res.json({ jobs });
  };

  handleGetCountryJobCount = async (_req: Request, res: Response<CountryJobsResponse>) => {
    const countryByJobCount = await this.jobRepo.getCountryGroup();
    res.status(200).json({ countries: countryByJobCount });
  };

  handleGetCategoriesJobCount = async (_req: Request, res: Response<CategoryJobsResponse>) => {
    const categoryByJobCount = await this.jobRepo.getCategoryGroup();
    res.json({ categories: categoryByJobCount });
  };

  handleGetFeatured = async (_req: Request, res: Response<JobListResponse>) => {
    const featured = await this.jobRepo.getFeatured();
    res.json({ jobs: featured });
  };

  handleGetRecent = async (_req: Request, res: Response<JobListResponse>) => {
    const featured = await this.jobRepo.getRecent();
    res.json({ jobs: featured });
  };
}
