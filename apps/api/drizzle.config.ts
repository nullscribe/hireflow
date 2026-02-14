import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USER!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    database: process.env.DB_NAME!,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.DB_CA_CERT!,
    },
  },
});
