import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema"; // Import your schema

// Create a Postgres pool using DATABASE_URL from environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Create a Drizzle instance using the pool and schema
export const db = drizzle(pool, { schema });
