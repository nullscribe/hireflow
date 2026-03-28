import { singleton } from "tsyringe";
import type { Request, Response } from "express";
import EmployerRepository from "../repositories/employer.repo.js";
import { BadRequestError, NotFoundError, type EmployerDetailResponse } from "@hireflow/types";

@singleton()
export default class EmployerController {
  constructor(private readonly employerRepo: EmployerRepository) {}

  handleGetTop = async (_req: Request, res: Response) => {
    const result = await this.employerRepo.getTop();
    res.json({ employers: result });
  };

  handleGetById = async (req: Request, res: Response<EmployerDetailResponse>) => {
    const id = Number(req.params["id"]);
    if (isNaN(id)) {
      throw new BadRequestError("Given employer id is not a number");
    }
    const result = await this.employerRepo.getById(id);
    if (result === undefined) {
      throw new NotFoundError("Employer with given id does not exist");
    }
    res.json(result);
  };
}
