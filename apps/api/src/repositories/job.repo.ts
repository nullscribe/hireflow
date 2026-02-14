import { singleton } from "tsyringe";
import db from "../db/index.js";
import { candidates, jobs, savedJobs } from "../db/schema.js";
import { and, desc, eq, gte, ilike, lte, type SQL, sql } from "drizzle-orm";
import type { CategoryGroup, CountryGroup, JobFilters, JobResponse } from "@hireflow/types";
import { toJobResponse, type SelectJobWithEmployer } from "../mappers/job.mapper.js";

@singleton()
export default class JobRepository {
  async getAll(filters: JobFilters): Promise<JobResponse[]> {
    const conditions = this.buildFilterConditions(filters);
    const result: SelectJobWithEmployer[] = await db.query.jobs.findMany({
      where: and(...conditions, eq(jobs.status, "active")),
      with: {
        employer: true,
      },
      limit: filters.limit ?? 10,
      offset: filters.offset ?? 0,
    });

    return result.map((item) => toJobResponse(item));
  }

  async getById(id: number): Promise<JobResponse> {
    const job: SelectJobWithEmployer | undefined = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.status, "active")),
      with: {
        employer: true,
      },
    });

    if (job === undefined) {
      throw new Error(`Job with id=${id} not found`);
    }

    return toJobResponse(job);
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

  async getSavedJob(candidateId: number): Promise<JobResponse[]> {
    const userWithSavedJobs = await db.query.candidates.findFirst({
      where: eq(candidates.id, candidateId),
      with: {
        savedJobs: {
          with: {
            job: {
              with: {
                employer: true,
              },
            },
          },
        },
      },
    });

    if (userWithSavedJobs === undefined || userWithSavedJobs.savedJobs === undefined) {
      throw new Error("User's saved jobs fetching failed");
    }

    return userWithSavedJobs.savedJobs.map((elem) => toJobResponse(elem.job));
  }

  async getCountryGroup(): Promise<CountryGroup[]> {
    return db
      .select({
        country: jobs.country,
        countryFlag: jobs.countryFlag,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .groupBy(jobs.country, jobs.countryFlag)
      .orderBy(desc(sql`count(*)`));
  }

  async getCategoryGroup(): Promise<CategoryGroup[]> {
    return db
      .select({
        category: jobs.category,
        icon_name: jobs.categoryMaterialIconName,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(jobs)
      .where(eq(jobs.status, "active"))
      .groupBy(jobs.category, jobs.categoryMaterialIconName)
      .orderBy(desc(sql`count(*)`));
  }

  async getFeatured(): Promise<JobResponse[]> {
    const featured: SelectJobWithEmployer[] = await db.query.jobs.findMany({
      where: and(eq(jobs.status, "active"), eq(jobs.isFeatured, true)),
      with: {
        employer: true,
      },
      orderBy: desc(jobs.postedAt),
      limit: 10,
    });

    return featured.map(toJobResponse);
  }

  async getRecent(): Promise<JobResponse[]> {
    const recent: SelectJobWithEmployer[] = await db.query.jobs.findMany({
      where: eq(jobs.status, "active"),
      with: {
        employer: true,
      },
      orderBy: desc(jobs.postedAt),
      limit: 10,
    });

    return recent.map(toJobResponse);
  }

  private buildFilterConditions(filters: JobFilters) {
    const conditions: SQL[] = [eq(jobs.status, "active")];

    if (filters.country) conditions.push(eq(jobs.country, filters.country));
    if (filters.isFeatured) conditions.push(eq(jobs.isFeatured, filters.isFeatured));
    if (filters.industry) conditions.push(eq(jobs.industry, filters.industry));
    if (filters.jobType) conditions.push(eq(jobs.jobType, filters.jobType));
    if (filters.experienceLevel) conditions.push(eq(jobs.experienceLevel, filters.experienceLevel));
    if (filters.category) conditions.push(eq(jobs.category, filters.category));
    if (filters.location) conditions.push(eq(jobs.location, filters.location));
    if (filters.salaryMin) conditions.push(gte(jobs.salaryMin, filters.salaryMin));
    if (filters.salaryMax) conditions.push(lte(jobs.salaryMax, filters.salaryMax));
    if (filters.search) conditions.push(ilike(jobs.title, `%${filters.search}%`));

    return conditions;
  }
}
