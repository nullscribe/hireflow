import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const jobTypeEnum = pgEnum("job_type", ["full-time", "part-time", "contract", "internship"]);
export const experienceLevelEnum = pgEnum("experience_level", ["entry", "mid", "senior"]);
export const jobStatusEnum = pgEnum("job_status", ["active", "closed"]);
export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "reviewed",
  "shortlisted",
  "rejected",
]);

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  phone: varchar("phone", { length: 20 }),
  resumeUrl: text("resume_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const candidatesRelations = relations(candidates, ({ many }) => ({
  applications: many(applications),
  savedJobs: many(savedJobs),
}));

export const employers = pgTable("employers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyWebsite: varchar("company_website", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const employersRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs),
}));

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  employerId: integer("employer_id")
    .references(() => employers.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  industry: varchar("industry_name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  jobType: jobTypeEnum("job_type").notNull(),
  experienceLevel: experienceLevelEnum("experience_level").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  category: varchar("category", { length: 100 }).notNull(),
  status: jobStatusEnum("status").default("active").notNull(),
  country: varchar("country", { length: 100 }).default("Bangladesh").notNull(),
  countryFlag: varchar("country_flag", { length: 10 }).default("🇧🇩").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  deadline: timestamp("deadline"), // Keep nullable - not all jobs have deadlines
  serviceCharge: varchar("service_charge", { length: 50 }).default("Free").notNull(),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
});

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
  applications: many(applications),
  savedJobs: many(savedJobs),
}));

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  candidateId: integer("candidate_id")
    .references(() => candidates.id, { onDelete: "cascade" })
    .notNull(),
  status: applicationStatusEnum("status").default("pending").notNull(),
  coverLetter: text("cover_letter"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  candidate: one(candidates, {
    fields: [applications.candidateId],
    references: [candidates.id],
  }),
}));

export const savedJobs = pgTable("saved_jobs", {
  id: serial("id").primaryKey(),
  candidateId: integer("candidate_id")
    .references(() => candidates.id, { onDelete: "cascade" })
    .notNull(),
  jobId: integer("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  savedAt: timestamp("saved_at").defaultNow().notNull(),
});

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
  candidate: one(candidates, {
    fields: [savedJobs.candidateId],
    references: [candidates.id],
  }),
  job: one(jobs, {
    fields: [savedJobs.jobId],
    references: [jobs.id],
  }),
}));
