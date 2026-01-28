import { singleton } from "tsyringe";
import db from "../db/index.js";
import { candidates, jobs, savedJobs } from "../db/schema.js";
import { and, eq } from "drizzle-orm";
import type { Job } from "@hireflow/types";

@singleton()
export default class JobRepository {
  async getAll(): Promise<Job[]> {
    const result: Job[] = await db.select().from(jobs);
    return result;
  }

  async getById(id: number): Promise<Job> {
    const [job]: Job[] = await db.select().from(jobs).where(eq(jobs.id, id));

    if (job === undefined) {
      throw new Error(`Job with id=${id} not found`);
    }

    return job;
  }

  async saveJob(jobId: number, candidateId: number): Promise<void> {
    const existing = await db
      .select()
      .from(savedJobs)
      .where(and(eq(savedJobs.candidateId, candidateId), eq(savedJobs.jobId, jobId)));

    if (existing.length > 0) {
      return;
    }

    const result = await db
      .insert(savedJobs)
      .values({
        candidateId,
        jobId
      })
      .returning();

    if (result === undefined) {
      throw new Error(`Saving job with id ${jobId} is unsuccessful`);
    }
  }

  async getSavedJob(candidateId: number): Promise<Job[]> {
    const userWithSavedJobs = await db.query.candidates.findFirst({
      where: eq(candidates.id, candidateId),
      with: {
        savedJobs: {
          with: {
            job: true
          }
        }
      }
    });

    if (userWithSavedJobs === undefined || userWithSavedJobs.savedJobs === undefined) {
      throw new Error("User's saved jobs fetching failed");
    }

    return userWithSavedJobs.savedJobs.map((elem) => elem.job);
  }
}
