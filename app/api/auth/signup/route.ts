import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { hashPassword, createSession, logAudit, getClientIp } from "@/lib/auth";
import { headers } from "next/headers";

const Body = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(200),
  display_name: z.string().min(1).max(80).optional()
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e: any) {
    return NextResponse.json({ error: "invalid_input", details: e.errors }, { status: 400 });
  }

  const existing = await query(`SELECT id FROM users WHERE email = $1`, [parsed.email]);
  if (existing.length) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const hash = await hashPassword(parsed.password);
  const [user] = await query<{ id: string }>(
    `INSERT INTO users (email, password_hash, display_name)
     VALUES ($1, $2, $3) RETURNING id`,
    [parsed.email, hash, parsed.display_name ?? null]
  );

  const ua = headers().get("user-agent") ?? undefined;
  await createSession(user.id, ua, getClientIp());
  await logAudit(user.id, "user.signup");

  return NextResponse.json({ ok: true, user_id: user.id });
}
