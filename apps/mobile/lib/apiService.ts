import api from "@/lib/api";
import type {
  BasicApiResponse,
  JobDetailResponse,
  AuthResponse,
  JobListResponse,
  FeaturedJobsResponse,
  RecentJobsResponse,
  CountryJobsResponse,
  SavedJobsResponse,
  CategoryJobsResponse,
} from "@hireflow/types";

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { name, email, password }),
};

export const jobsApi = {
  getAll: () => api.get<JobListResponse>("/jobs"),

  getById: (id: number) => api.get<JobDetailResponse>(`/jobs/${id}`),

  saveJob: (id: number) => api.post<BasicApiResponse>(`/jobs/${id}/save`),

  getSavedJobs: () => api.get<SavedJobsResponse>("/jobs/saved"),

  getFeaturedJobs: () => api.get<FeaturedJobsResponse>("/jobs/featured"),

  getRecentJobs: () => api.get<RecentJobsResponse>("/jobs/recent"),

  getCountries: () => api.get<CountryJobsResponse>("/jobs/countries"),

  getCategories: () => api.get<CategoryJobsResponse>("/jobs/categories"),
};
