import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { verifyPassword, createSession, logAudit, getClientIp } from "@/lib/auth";
import { headers } from "next/headers";

const Body = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1)
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e: any) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const rows = await query<{ id: string; password_hash: string; status: string }>(
    `SELECT id, password_hash, status FROM users WHERE email = $1 LIMIT 1`,
    [parsed.email]
  );

  if (!rows.length) {
    await logAudit(null, "auth.login_failed", { email: parsed.email, reason: "unknown_email" });
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const user = rows[0];
  if (user.status !== "active") {
    return NextResponse.json({ error: "account_disabled" }, { status: 403 });
  }

  const ok = await verifyPassword(parsed.password, user.password_hash);
  if (!ok) {
    await logAudit(user.id, "auth.login_failed", { reason: "bad_password" });
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const ua = headers().get("user-agent") ?? undefined;
  await createSession(user.id, ua, getClientIp());
  await logAudit(user.id, "auth.login_ok");

  return NextResponse.json({ ok: true });
}
