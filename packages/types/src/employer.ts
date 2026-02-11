export interface Employer {
  id: number;
  name: string;
  email: string;
  password: string;
  companyName: string;
  avatarUrl: string | null;
  companyWebsite: string | null;
  phone: string | null;
  createdAt: Date;
}

export type EmployerResponse = Omit<Employer, "password">;

export interface EmployerJobCount extends Pick<
  EmployerResponse,
  "id" | "companyName" | "avatarUrl"
> {
  jobCount: number;
}

export interface EmployerJobCountResponse {
  employers: EmployerJobCount[];
}
