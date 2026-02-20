import type { EmployerDetailResponse } from "@hireflow/types";
import type { SelectEmployer, SelectJob } from "../db/schema/index.js";
import { toJobDTO } from "./job.mapper.js";

export interface SelectEmployerWithJobs extends SelectEmployer {
  jobs: SelectJob[];
}

export function toEmployerWithJobsResponse(data: SelectEmployerWithJobs): EmployerDetailResponse {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    about: data.about,
    employeeCount: data.employeeCount,
    companyName: data.companyName,
    avatarUrl: data.avatarUrl,
    companyWebsite: data.companyWebsite,
    phone: data.phone,
    createdAt: data.createdAt,
    jobs: data.jobs.map(toJobDTO),
  };
}
