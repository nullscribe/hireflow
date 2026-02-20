import { singleton } from "tsyringe";
import type { Response } from "express";
import CandidateRepository from "../repositories/candidate.repo.js";
import type { AuthRequest } from "../middlewares/authHandler.js";
import type { CandidateProfileResponse, ErrorResponse } from "@hireflow/types";

@singleton()
export default class CandidateController {
  constructor(public readonly candidateRepo: CandidateRepository) {}

  handleGetProfile = async (
    req: AuthRequest,
    res: Response<CandidateProfileResponse | ErrorResponse>,
  ) => {
    try {
      const result = await this.candidateRepo.getProfile(req.user?.userId ?? 0);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({ error: "Internal server error" });
    }
  };
}
