import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  timestamp,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

import { genderEnum, platformEnum, proficiencyLevelEnum } from "./shared.js";

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  country: varchar("country", { length: 255 }),
  linkedInUrl: varchar("linkedin_url", { length: 255 }),
  portfolioUrl: varchar("portfolio_url", { length: 255 }),
  profileCompletionScore: integer("profile_completion_score").default(10).notNull(),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  phone: varchar("phone", { length: 20 }),
  avatarUrl: text("avatar_url"),
  resumeUrl: text("resume_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectCandidate = typeof candidates.$inferSelect;

export const candidateSkills = pgTable(
  "candidate_skills",
  {
    id: serial("id").primaryKey(),
    candidateId: integer("candidate_id")
      .references(() => candidates.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    proficiencyLevel: proficiencyLevelEnum("proficiency_level").notNull().default("beginner"),
  },
  (table) => [unique().on(table.candidateId, table.name)],
);

export type SelectCandidateSkill = typeof candidateSkills.$inferSelect;

export const candidateEducations = pgTable(
  "candidate_educations",
  {
    id: serial("id").primaryKey(),
    candidateId: integer("candidate_id")
      .references(() => candidates.id, { onDelete: "cascade" })
      .notNull(),
    institution: varchar("institution", { length: 255 }).notNull(),
    degree: varchar("degree", { length: 255 }).notNull(),
    fieldOfStudy: varchar("field_of_study", { length: 255 }).notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    isCurrent: boolean("is_current").notNull().default(false),
  },
  (table) => [unique().on(table.candidateId, table.degree, table.institution)],
);

export type SelectCandidateEducation = typeof candidateEducations.$inferSelect;

export const candidateExperiences = pgTable("candidate_experiences", {
  id: serial("id").primaryKey(),
  candidateId: integer("candidate_id")
    .references(() => candidates.id, { onDelete: "cascade" })
    .notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isCurrent: boolean("is_current").notNull().default(false),
});

export type SelectCandidateExperience = typeof candidateExperiences.$inferSelect;

export const candidateDeviceTokens = pgTable("candidate_device_tokens", {
  id: serial("id").primaryKey(),
  candidateId: integer("candidate_id")
    .references(() => candidates.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  platform: platformEnum().notNull(),
});

export type SelectCandidateToken = typeof candidateDeviceTokens.$inferSelect;
