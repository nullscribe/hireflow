export interface Job {
  id: number;
  employerId: number;
  title: string;
  industry: string;
  description: string;
  requirements: string | null;
  jobType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior";
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  category: string;
  status: "active" | "closed" | "draft";
  country: string;
  countryFlag: string;
  isFeatured: boolean;
  deadline: Date | null;
  serviceCharge: string;
  postedAt: Date;
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
  search?: string;
  limit?: number;
  offset?: number;
}

export interface JobListResponse {
  jobs: Job[];
}

export interface JobDetailResponse {
  job: Job;
}

export interface SavedJobsResponse {
  jobs: Job[];
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
  count: number;
}

export interface CategoryJobsResponse {
  categories: CategoryGroup[];
}

export interface FeaturedJobsResponse {
  jobs: Job[];
}

export interface RecentJobsResponse {
  jobs: Job[];
}
