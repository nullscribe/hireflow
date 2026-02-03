ALTER TABLE "jobs" ADD COLUMN "country" varchar(100) DEFAULT 'Bangladesh' NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "country_flag" varchar(10) DEFAULT '🇧🇩' NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "deadline" timestamp;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "service_charge" varchar(50) DEFAULT 'Free' NOT NULL;