import { singleton } from "tsyringe";
import type { Request, Response } from "express";
// import { type HealthCheckResponse } from "@hireflow/types";

@singleton()
export default class HealthCheckController {
  async healthCheck(_req: Request, res: Response) {
    res.json({ status: "ok" });
  }
}
