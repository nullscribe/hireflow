import { pgTable, serial, integer, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

import { jobStatusEnum, experienceLevelEnum, jobTypeEnum } from "./shared.js";
import { employers } from "./employer.entity.js";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  employerId: integer("employer_id")
    .references(() => employers.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  industry: varchar("industry_name", { length: 255 }).notNull(),
  industryMaterialIconName: varchar("industry_m_icon_name", { length: 50 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  responsibilities: text("responsibilities"),
  jobType: jobTypeEnum("job_type").notNull(),
  experienceLevel: experienceLevelEnum("experience_level").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  category: varchar("category", { length: 100 }).notNull(),
  categoryMaterialIconName: varchar("category_m_icon_name", { length: 50 }).notNull(),
  status: jobStatusEnum("status").default("active").notNull(),
  country: varchar("country", { length: 100 }).default("Bangladesh").notNull(),
  countryFlag: varchar("country_flag", { length: 10 }).default("🇧🇩").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  deadline: timestamp("deadline"), // Keep nullable - not all jobs have deadlines
  serviceCharge: varchar("service_charge", { length: 50 }).default("Free").notNull(),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
});

export type SelectJob = typeof jobs.$inferSelect;
