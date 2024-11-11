// src/db/schema.ts
import { pgTable, text, uuid, real, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const carbonResults = pgTable('carbon_results', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull(),
    type: text('type').notNull(), // 'food' or 'transportation'
    result: real('result').notNull(), // CO2e result in kg
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
