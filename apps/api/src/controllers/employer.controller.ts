import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import EmployerRepository from "../repositories/employer.repo.js";
import type { EmployerDetailResponse, ErrorResponse } from "@hireflow/types";

@singleton()
export default class EmployerController {
  constructor(private readonly employerRepo: EmployerRepository) {}

  handleGetTop = async (_req: Request, res: Response) => {
    const result = await this.employerRepo.getTop();
    res.json({ employers: result });
  };

  handleGetById = async (req: Request, res: Response<EmployerDetailResponse | ErrorResponse>) => {
    try {
      const id = Number(req.params["id"]);

      if (isNaN(id)) {
        res.status(400).json({ error: "Given employer id is not a number" });
      }

      const result = await this.employerRepo.getById(id);

      if (result === undefined) {
        res.status(404).json({ error: "Employer not found" });
        return;
      }

      res.json(result);
    } catch (err: unknown) {
      let message = "Internal server error";

      if (err instanceof Error) message = err.message;
      res.status(500).json({ error: message });
    }
  };
}
