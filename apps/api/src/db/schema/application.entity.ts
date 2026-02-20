import { pgTable, serial, integer, text, timestamp, unique } from "drizzle-orm/pg-core";

import { candidates } from "./candidate.entity.js";
import { applicationStatusEnum } from "./shared.js";
import { jobs } from "./job.entity.js";

export const applications = pgTable(
  "applications",
  {
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
  },
  (table) => [unique().on(table.jobId, table.candidateId)],
);

export type SelectApplication = typeof applications.$inferSelect;
