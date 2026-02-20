import { pgEnum } from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", ["full-time", "part-time", "contract", "internship"]);
export const experienceLevelEnum = pgEnum("experience_level", ["entry", "mid", "senior"]);
export const jobStatusEnum = pgEnum("job_status", ["active", "closed"]);
export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "reviewed",
  "shortlisted",
  "rejected",
  "accepted",
  "withdrawn",
]);
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const proficiencyLevelEnum = pgEnum("proficiency_level", [
  "beginner",
  "intermediate",
  "expert",
]);
export const platformEnum = pgEnum("platform", ["ios", "android"]);
