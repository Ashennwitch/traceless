CREATE TABLE IF NOT EXISTS "carbon_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"result" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
