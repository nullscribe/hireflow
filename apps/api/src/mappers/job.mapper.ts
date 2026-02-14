import type { SelectEmployer, SelectJob } from "../db/schema.js";
import type { JobDTO, JobResponse } from "@hireflow/types";

export interface SelectJobWithEmployer extends SelectJob {
  employer: SelectEmployer;
}

export function toJobResponse(data: SelectJobWithEmployer): JobResponse {
  return {
    id: data.id,
    title: data.title,
    industry: data.industry,
    industryMaterialIconName: data.industryMaterialIconName,
    description: data.description,
    requirements: data.requirements,
    responsibilities: data.responsibilities,
    jobType: data.jobType,
    experienceLevel: data.experienceLevel,
    location: data.location,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    category: data.category,
    categoryMaterialIconName: data.categoryMaterialIconName,
    status: data.status,
    country: data.country,
    countryFlag: data.countryFlag,
    isFeatured: data.isFeatured,
    deadline: data.deadline,
    serviceCharge: data.serviceCharge,
    postedAt: data.postedAt,
    employer: {
      id: data.employer.id,
      name: data.employer.name,
      email: data.employer.email,
      about: data.employer.about,
      employeeCount: data.employer.employeeCount,
      companyName: data.employer.companyName,
      avatarUrl: data.employer.avatarUrl,
      phone: data.employer.phone,
      companyWebsite: data.employer.companyWebsite,
      createdAt: data.employer.createdAt,
    },
  };
}

export function toJobDTO(data: SelectJob): JobDTO {
  return {
    id: data.id,
    title: data.title,
    industry: data.industry,
    industryMaterialIconName: data.industryMaterialIconName,
    description: data.description,
    requirements: data.requirements,
    responsibilities: data.responsibilities,
    jobType: data.jobType,
    experienceLevel: data.experienceLevel,
    location: data.location,
    salaryMax: data.salaryMax,
    salaryMin: data.salaryMin,
    category: data.category,
    categoryMaterialIconName: data.categoryMaterialIconName,
    status: data.status,
    country: data.country,
    countryFlag: data.countryFlag,
    isFeatured: data.isFeatured,
    deadline: data.deadline,
    serviceCharge: data.serviceCharge,
    postedAt: data.postedAt,
  };
}
