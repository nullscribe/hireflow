import * as z from "zod";

export const UpdateCandidateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255).optional(),
  title: z.string().max(255, "Title too long").optional(),
  bio: z.string().max(1000, "Bio too long").optional(),
  location: z.string().max(255).optional(),
  country: z.string().max(255).optional(),
  phone: z.string().max(20, "Phone number too long").optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.iso.date("Invalid date format").optional(),
  linkedInUrl: z.url("Invalid LinkedIn URL").optional(),
  portfolioUrl: z.url("Invalid portfolio URL").optional(),
});

export type UpdateCandidateProfileDTO = z.infer<typeof UpdateCandidateProfileSchema>;

export const AddCandidateSkillSchema = z.object({
  name: z.string().min(1, "Skill name cannot be empty").max(255),
  proficiencyLevel: z.enum(["beginner", "intermediate", "expert"]),
});

export type AddCandidateSkillDTO = z.infer<typeof AddCandidateSkillSchema>;
export const UpdateCandidateSkillSchema = AddCandidateSkillSchema.partial();
export type UpdateCandidateSkillDTO = z.infer<typeof UpdateCandidateSkillSchema>;

export const AddCandidateEducationSchema = z.object({
  institution: z.string().min(1, "Institution name cannot be empty").max(255),
  degree: z.string().min(1, "Degree name cannot be empty").max(255),
  fieldOfStudy: z.string().min(1, "Field of Study cannot be empty").max(255),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  isCurrent: z.boolean().optional().default(false),
});

export type AddCandidateEducationDTO = z.infer<typeof AddCandidateEducationSchema>;
export const UpdateCandidateEducationSchema = AddCandidateEducationSchema.partial();
export type UpdateCandidateEducationDTO = z.infer<typeof UpdateCandidateEducationSchema>;

export const AddCandidateExperienceSchema = z.object({
  companyName: z.string().min(1, "Company name cannot be empty").max(255),
  jobTitle: z.string().min(1, "Job Title cannot be empty").max(255),
  location: z.string().max(255).optional(),
  description: z.string().optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  isCurrent: z.boolean().optional().default(false),
});

export type AddCandidateExperienceDTO = z.infer<typeof AddCandidateExperienceSchema>;
export const UpdateCandidateExperienceSchema = AddCandidateExperienceSchema.partial();
export type UpdateCandidateExperienceDTO = z.infer<typeof UpdateCandidateExperienceSchema>;

export const DeviceTokenSchema = z.object({
  token: z.string().min(1, "Token cannot be empty"),
  platform: z.enum(["ios", "android"]),
});

export type DeviceTokenDTO = z.infer<typeof DeviceTokenSchema>;

export interface CandidateSkillDTO {
  id: number;
  name: string;
  proficiencyLevel: "beginner" | "intermediate" | "expert";
}

export interface CandidateEducationDTO {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
}

export interface CandidateExperienceDTO {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
}

export interface CandidateDTO {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  location: string | null;
  country: string | null;
  linkedInUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  profileCompletionScore: number;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | null;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface CandidateProfileResponse extends CandidateDTO {
  skills: CandidateSkillDTO[];
  educations: CandidateEducationDTO[];
  experiences: CandidateExperienceDTO[];
  missing: string[];
}

export interface CompletionResponse {
  score: number;
  missing: string[];
}
