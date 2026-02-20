import { pgTable, integer, primaryKey, timestamp } from "drizzle-orm/pg-core";

import { candidates } from "./candidate.entity.js";
import { jobs } from "./job.entity.js";
import { employers } from "./employer.entity.js";

export const savedJobs = pgTable(
  "saved_jobs",
  {
    candidateId: integer("candidate_id")
      .references(() => candidates.id, { onDelete: "cascade" })
      .notNull(),
    jobId: integer("job_id")
      .references(() => jobs.id, { onDelete: "cascade" })
      .notNull(),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.jobId, table.candidateId] })],
);

export type SelectSavedJob = typeof savedJobs.$inferSelect;

export const employerFollows = pgTable(
  "employer_follows",
  {
    candidateId: integer("candidate_id")
      .references(() => candidates.id, { onDelete: "cascade" })
      .notNull(),
    employerId: integer("employer_id")
      .references(() => employers.id, { onDelete: "cascade" })
      .notNull(),
    followedAt: timestamp("followed_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.candidateId, table.employerId] })],
);

export type SelectEmployerFollows = typeof employerFollows.$inferSelect;
