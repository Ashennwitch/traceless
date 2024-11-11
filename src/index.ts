import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

export const db = drizzle(process.env.DATABASE_URL as string);