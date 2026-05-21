import { NextResponse } from "next/server";
import { destroySession, getCurrentUser, logAudit } from "@/lib/auth";

export async function POST() {
  const u = await getCurrentUser();
  await destroySession();
  if (u) await logAudit(u.id, "auth.logout");
  return NextResponse.json({ ok: true });
}
