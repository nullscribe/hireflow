ALTER TYPE "public"."application_status" ADD VALUE 'accepted';--> statement-breakpoint
ALTER TYPE "public"."application_status" ADD VALUE 'withdrawn';--> statement-breakpoint
ALTER TABLE "candidate_educations" DROP CONSTRAINT "candidate_educations_candidate_id_degree_unique";--> statement-breakpoint
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_candidate_id_degree_institution_unique" UNIQUE("candidate_id","degree","institution");