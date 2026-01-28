import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import HealthCheckRepository from "../repositories/healthCheck.repo.js";
import type { HealthCheckResponse } from "@hireflow/types";

@singleton()
export default class HealthCheckController {
  constructor(private readonly healthCheckRepo: HealthCheckRepository) {}

  handleHealthCheck = async (_req: Request, res: Response) => {
    try {
      await this.healthCheckRepo.dbSelectOne();
      res.json({
        status: "healthy",
        database: {
          status: "healthy"
        }
      } as HealthCheckResponse);
    } catch (error) {
      res.status(500).json({
        status: "healthy",
        database: {
          status: "unhealthy",
          error: error
        }
      } as HealthCheckResponse);
    }
  };
}
