import { serial, pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { platformEnum } from "./shared.js";

export const employers = pgTable("employers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  about: text("about").notNull().default(""),
  employeeCount: integer("employee_count").notNull().default(50),
  password: text("password").notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),
  companyWebsite: varchar("company_website", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectEmployer = typeof employers.$inferSelect;

export const employerDeviceTokens = pgTable("employer_device_tokens", {
  id: serial("id").primaryKey(),
  employerId: integer("employer_id")
    .references(() => employers.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  platform: platformEnum().notNull(),
});

export type SelectEmployerToken = typeof employerDeviceTokens.$inferSelect;
