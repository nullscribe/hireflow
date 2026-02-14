import type { JobDTO } from "./job.js";

export interface Employer {
  id: number;
  name: string;
  email: string;
  about: string;
  employeeCount: number;
  password: string;
  companyName: string;
  avatarUrl: string | null;
  companyWebsite: string | null;
  phone: string | null;
  createdAt: Date;
}

export type EmployerDTO = Omit<Employer, "password">;

export interface EmployerDetailResponse extends EmployerDTO {
  jobs: JobDTO[];
}

export interface EmployerJobCount extends Pick<EmployerDTO, "id" | "companyName" | "avatarUrl"> {
  jobCount: number;
}

export interface EmployerJobCountResponse {
  employers: EmployerJobCount[];
}
