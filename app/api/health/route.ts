import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "processing-platform",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
    uptime_s: Math.round(process.uptime())
  });
}
