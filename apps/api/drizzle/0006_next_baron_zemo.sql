ALTER TABLE "employers" ADD COLUMN "about" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "employers" ADD COLUMN "employee_count" integer DEFAULT 50 NOT NULL;
