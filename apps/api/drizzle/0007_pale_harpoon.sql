CREATE TABLE "employer_follows" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"followed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employer_follows" ADD CONSTRAINT "employer_follows_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employer_follows" ADD CONSTRAINT "employer_follows_employee_id_employers_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;