import type { EmployerDTO } from "./employer.type.js";

export interface JobDTO {
  id: number;
  title: string;
  industry: string;
  industryMaterialIconName: string;
  description: string;
  requirements: string | null;
  responsibilities: string | null;
  jobType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior";
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  category: string;
  categoryMaterialIconName: string;
  status: "active" | "closed" | "draft";
  country: string;
  countryFlag: string;
  isFeatured: boolean;
  deadline: Date | null;
  serviceCharge: string;
  postedAt: Date;
}

export interface JobResponse extends JobDTO {
  employer?: EmployerDTO;
}

export interface JobFilters {
  country?: string;
  industry?: string;
  jobType?: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel?: "entry" | "mid" | "senior";
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  isFeatured?: boolean;
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface JobListResponse {
  jobs: JobResponse[];
}

export interface JobDetailResponse {
  job: JobResponse;
}

export interface CountryGroup {
  country: string;
  countryFlag: string;
  count: number;
}

export interface CountryJobsResponse {
  countries: CountryGroup[];
}

export interface CategoryGroup {
  category: string;
  icon_name: string;
  count: number;
}

export interface CategoryJobsResponse {
  categories: CategoryGroup[];
}
