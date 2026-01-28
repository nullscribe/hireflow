export interface Job {
  id: number;
  employerId: number;
  title: string;
  companyName: string;
  description: string;
  requirements: string | null;
  jobType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior";
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  category: string;
  status: "active" | "closed" | "draft";
  postedAt: Date;
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
