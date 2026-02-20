import { singleton } from "tsyringe";
import type { EmployerDetailResponse, EmployerJobCount } from "@hireflow/types";
import db from "../db/index.js";
import { count, desc, eq } from "drizzle-orm";
import { employers, jobs } from "../db/schema/index.js";
import {
  toEmployerWithJobsResponse,
  type SelectEmployerWithJobs,
} from "../mappers/employer.mapper.js";

@singleton()
export default class EmployerRepository {
  async getTop(): Promise<EmployerJobCount[]> {
    const result = await db
      .select({
        id: employers.id,
        companyName: employers.companyName,
        avatarUrl: employers.avatarUrl,
        jobCount: count(jobs.id),
      })
      .from(employers)
      .leftJoin(jobs, eq(employers.id, jobs.employerId))
      .groupBy(employers.id)
      .orderBy(desc(count(jobs.id)))
      .limit(5);
    return result;
  }

  async getById(id: number): Promise<EmployerDetailResponse | undefined> {
    const result: SelectEmployerWithJobs | undefined = await db.query.employers.findFirst({
      where: eq(employers.id, id),
      with: {
        jobs: true,
      },
    });

    if (result === undefined) {
      return result;
    }

    return toEmployerWithJobsResponse(result);
  }
}
