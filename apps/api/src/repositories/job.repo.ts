import { singleton } from "tsyringe";
import db from "../db/index.js";
import { candidates, jobs, savedJobs } from "../db/schema.js";
import { and, desc, eq, gte, ilike, lte, type SQL, sql } from "drizzle-orm";
import type { CategoryGroup, CountryGroup, Job, JobFilters } from "@hireflow/types";

@singleton()
export default class JobRepository {
  async getAll(filters: JobFilters): Promise<Job[]> {
    const conditions = this.buildFilterConditions(filters);
    const result: Job[] = await db
      .select()
      .from(jobs)
      .where(and(...conditions))
      .orderBy(desc(jobs.postedAt))
      .limit(filters.limit ?? 10)
      .offset(filters.offset ?? 0);

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
        jobId,
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
            job: true,
          },
        },
      },
    });

    if (userWithSavedJobs === undefined || userWithSavedJobs.savedJobs === undefined) {
      throw new Error("User's saved jobs fetching failed");
    }

    return userWithSavedJobs.savedJobs.map((elem) => elem.job);
  }

  async getCountryGroup(): Promise<CountryGroup[]> {
    const result = await db
      .select({
        country: jobs.country,
        countryFlag: jobs.countryFlag,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .groupBy(jobs.country, jobs.countryFlag)
      .orderBy(desc(sql`count(*)`));

    return result;
  }

  async getCategoryGroup(): Promise<CategoryGroup[]> {
    const result = await db
      .select({
        category: jobs.category,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .groupBy(jobs.category)
      .orderBy(desc(sql`count(*)`));

    return result;
  }

  async getFeatured(): Promise<Job[]> {
    const result = await db
      .select()
      .from(jobs)
      .where(eq(jobs.isFeatured, true))
      .orderBy(desc(jobs.postedAt))
      .limit(10);

    return result;
  }

  async getRecent(): Promise<Job[]> {
    const result = await db
      .select()
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .orderBy(desc(jobs.postedAt))
      .limit(10);

    return result;
  }

  private buildFilterConditions(filters: JobFilters) {
    const conditions: SQL[] = [eq(jobs.status, "active")];

    if (filters.country) conditions.push(eq(jobs.country, filters.country));
    if (filters.isFeatured) conditions.push(eq(jobs.isFeatured, filters.isFeatured));
    if (filters.industry) conditions.push(eq(jobs.industry, filters.industry));
    if (filters.jobType) conditions.push(eq(jobs.jobType, filters.jobType));
    if (filters.experienceLevel) conditions.push(eq(jobs.experienceLevel, filters.experienceLevel));
    if (filters.location) conditions.push(eq(jobs.location, filters.location));
    if (filters.salaryMin) conditions.push(gte(jobs.salaryMin, filters.salaryMin));
    if (filters.salaryMax) conditions.push(lte(jobs.salaryMax, filters.salaryMax));
    if (filters.search) conditions.push(ilike(jobs.title, `%${filters.search}`));

    return conditions;
  }
}
