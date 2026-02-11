import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import EmployerRepository from "../repositories/employer.repo.js";

@singleton()
export default class EmployerController {
  constructor(private readonly employerRepo: EmployerRepository) {}

  handleGetTop = async (_req: Request, res: Response) => {
    const result = await this.employerRepo.getTop();
    res.json({ employers: result });
  };
}
