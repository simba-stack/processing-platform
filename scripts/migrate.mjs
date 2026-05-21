import { readFileSync } from "node:fs";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sql = readFileSync(new URL("../lib/schema.sql", import.meta.url), "utf8");

try {
  console.log("Running migration...");
  await pool.query(sql);
  console.log("OK");
} catch (err) {
  console.error("Migration failed:", err);
  process.exit(1);
} finally {
  await pool.end();
}
