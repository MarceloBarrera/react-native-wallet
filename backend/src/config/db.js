import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// creates SQL connection
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    console.log("Connecting to the database...");
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1); // status code 1 indicates failure, 0 indicates success
  }
}
