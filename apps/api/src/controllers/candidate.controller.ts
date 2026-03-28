import { singleton } from "tsyringe";
import type { Response } from "express";
import CandidateRepository from "../repositories/candidate.repo.js";
import type { AuthRequest } from "../middlewares/authHandler.js";
import { NotFoundError, type CandidateProfileResponse } from "@hireflow/types";

@singleton()
export default class CandidateController {
  constructor(public readonly candidateRepo: CandidateRepository) {}

  handleGetProfile = async (req: AuthRequest, res: Response<CandidateProfileResponse>) => {
    const userId = req.user?.userId;
    if (userId === undefined || isNaN(userId)) {
      throw new NotFoundError("User authentication context is missing or invalid");
    }
    const result = await this.candidateRepo.getProfile(userId);
    if (result === undefined) {
      throw new NotFoundError("Candidate profile not found");
    }
    res.json(result);
  };
}
