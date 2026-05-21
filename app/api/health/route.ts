import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  let db: "ok" | "fail" | "skipped" = "skipped";
  if (process.env.DATABASE_URL) {
    try {
      await query("SELECT 1");
      db = "ok";
    } catch {
      db = "fail";
    }
  }
  return NextResponse.json({
    status: "ok",
    service: "processing-platform",
    version: "0.2.0",
    db,
    timestamp: new Date().toISOString(),
    uptime_s: Math.round(process.uptime())
  });
}
