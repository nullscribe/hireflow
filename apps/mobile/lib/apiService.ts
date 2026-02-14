import api from "@/lib/api";
import {
  type BasicApiResponse,
  type JobDetailResponse,
  type AuthResponse,
  type JobListResponse,
  type CountryJobsResponse,
  type CategoryJobsResponse,
  type JobFilters,
  type EmployerJobCountResponse,
  EmployerDetailResponse,
} from "@hireflow/types";

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { name, email, password }),
};

export const jobsApi = {
  getAll: (filters?: JobFilters) => api.get<JobListResponse>("/jobs", { params: filters }),

  getById: (id: number) => api.get<JobDetailResponse>(`/jobs/${id}`),

  saveJob: (id: number) => api.post<BasicApiResponse>(`/jobs/${id}/save`),

  getSavedJobs: () => api.get<JobListResponse>("/jobs/saved"),

  getFeaturedJobs: () => api.get<JobListResponse>("/jobs/featured"),

  getRecentJobs: () => api.get<JobListResponse>("/jobs/recent"),

  getCountries: () => api.get<CountryJobsResponse>("/jobs/countries"),

  getCategories: () => api.get<CategoryJobsResponse>("/jobs/categories"),
};

export const employersApi = {
  getTop: () => api.get<EmployerJobCountResponse>("/employers/top"),
  getById: (id: number) => api.get<EmployerDetailResponse>(`/employers/${id}`),
};
