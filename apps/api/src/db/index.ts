import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema.js";
import { DATABASE_URL } from "../secrets.js";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool, { schema });

export default db;
