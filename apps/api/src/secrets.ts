import dotenv from "dotenv";

dotenv.config({ path: ".env", quiet: true });

export const PORT = process.env.PORT || 4000;

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

if (ENVIRONMENT === "production" && JWT_SECRET === "secret") {
  throw new Error("JWT_SECRET must be set in production");
}

export const DB_CA_CERT = process.env.DB_CA_CERT || "WRONG DB CA CERTIFICATE";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
export const DB_NAME = process.env.DB_NAME || "hireflow";
export const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/kanon";

export const PACKAGE_VERSION = process.env.APP_VERSION || "Not Specified";
