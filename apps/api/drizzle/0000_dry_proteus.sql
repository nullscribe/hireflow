CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewed', 'shortlisted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('entry', 'mid', 'senior');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('active', 'closed');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('ios', 'android');--> statement-breakpoint
CREATE TYPE "public"."proficiency_level" AS ENUM('beginner', 'intermediate', 'expert');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"cover_letter" text,
	"applied_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employer_follows" (
	"candidate_id" integer NOT NULL,
	"employer_id" integer NOT NULL,
	"followed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employer_follows_candidate_id_employer_id_pk" PRIMARY KEY("candidate_id","employer_id")
);
--> statement-breakpoint
CREATE TABLE "saved_jobs" (
	"candidate_id" integer NOT NULL,
	"job_id" integer NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_jobs_job_id_candidate_id_pk" PRIMARY KEY("job_id","candidate_id")
);
--> statement-breakpoint
CREATE TABLE "candidate_device_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"platform" "platform" NOT NULL,
	CONSTRAINT "candidate_device_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "candidate_educations" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"institution" varchar(255) NOT NULL,
	"degree" varchar(255) NOT NULL,
	"field_of_study" varchar(255) NOT NULL,
	"start_date" date,
	"end_date" date,
	"is_current" boolean DEFAULT false NOT NULL,
	CONSTRAINT "candidate_educations_candidate_id_degree_unique" UNIQUE("candidate_id","degree")
);
--> statement-breakpoint
CREATE TABLE "candidate_experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"location" varchar(255),
	"description" text,
	"start_date" date,
	"end_date" date,
	"is_current" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidate_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"proficiencyLevel" "proficiency_level" DEFAULT 'beginner' NOT NULL,
	CONSTRAINT "candidate_skills_candidate_id_name_unique" UNIQUE("candidate_id","name")
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255),
	"bio" text,
	"location" varchar(255),
	"country" varchar(255),
	"linkedin_url" varchar(255),
	"portfolio_url" varchar(255),
	"profile_completion_score" integer DEFAULT 0 NOT NULL,
	"date_of_birth" date,
	"gender" "gender",
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"phone" varchar(20),
	"avatar_url" text,
	"resume_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "candidates_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "employer_device_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"employer_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	"platform" "platform" NOT NULL,
	CONSTRAINT "employer_device_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "employers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"about" text DEFAULT '' NOT NULL,
	"employee_count" integer DEFAULT 50 NOT NULL,
	"password" text NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"avatar_url" text,
	"company_website" varchar(255),
	"phone" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"employer_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"industry_name" varchar(255) NOT NULL,
	"industry_m_icon_name" varchar(20) NOT NULL,
	"description" text NOT NULL,
	"requirements" text,
	"responsibilities" text,
	"job_type" "job_type" NOT NULL,
	"experience_level" "experience_level" NOT NULL,
	"location" varchar(255) NOT NULL,
	"salary_min" integer,
	"salary_max" integer,
	"category" varchar(100) NOT NULL,
	"category_m_icon_name" varchar(20) NOT NULL,
	"status" "job_status" DEFAULT 'active' NOT NULL,
	"country" varchar(100) DEFAULT 'Bangladesh' NOT NULL,
	"country_flag" varchar(10) DEFAULT '🇧🇩' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"deadline" timestamp,
	"service_charge" varchar(50) DEFAULT 'Free' NOT NULL,
	"posted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employer_follows" ADD CONSTRAINT "employer_follows_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employer_follows" ADD CONSTRAINT "employer_follows_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_device_tokens" ADD CONSTRAINT "candidate_device_tokens_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_experiences" ADD CONSTRAINT "candidate_experiences_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employer_device_tokens" ADD CONSTRAINT "employer_device_tokens_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;
