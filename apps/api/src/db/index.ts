import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema/index.js";
import { DB_CA_CERT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../secrets.js";

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  max: 5,
  ssl: {
    servername: DB_HOST,
    rejectUnauthorized: true,
    ca: DB_CA_CERT,
  },
});

const db = drizzle(pool, { schema });

export default db;
