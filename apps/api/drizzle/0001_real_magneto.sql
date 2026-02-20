ALTER TABLE "jobs" ALTER COLUMN "industry_m_icon_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "category_m_icon_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_candidate_id_unique" UNIQUE("job_id","candidate_id");