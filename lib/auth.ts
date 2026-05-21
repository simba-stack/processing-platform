import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { query } from "./db";

const SESSION_COOKIE = "pp_session";
const SESSION_TTL_DAYS = 30;

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "dev-only-secret-change-in-prod-please-32+chars"
);

export type User = {
  id: string;
  email: string;
  display_name: string | null;
  role: string;
  status: string;
  created_at: string;
};

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("base64url");
}

export function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export async function createSession(userId: string, ua?: string, ip?: string): Promise<string> {
  const raw = generateToken();
  const tokenHash = hashToken(raw);
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86400_000);

  await query(
    `INSERT INTO sessions (user_id, token_hash, user_agent, ip, expires_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, tokenHash, ua ?? null, ip ?? null, expires]
  );

  const jwt = await new SignJWT({ uid: userId, t: tokenHash.slice(0, 16) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_DAYS}d`)
    .sign(SECRET);

  cookies().set(SESSION_COOKIE, `${raw}.${jwt}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires
  });

  return raw;
}

export async function destroySession(): Promise<void> {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  if (cookie) {
    const [raw] = cookie.split(".");
    await query(`DELETE FROM sessions WHERE token_hash = $1`, [hashToken(raw)]);
  }
  cookies().delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookie = cookies().get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  const [raw, jwt] = cookie.split(".");
  if (!raw || !jwt) return null;

  try {
    await jwtVerify(jwt, SECRET);
  } catch {
    return null;
  }

  const tokenHash = hashToken(raw);
  const rows = await query<User>(
    `SELECT u.id, u.email, u.display_name, u.role, u.status, u.created_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now() AND u.status = 'active'
     LIMIT 1`,
    [tokenHash]
  );

  if (!rows.length) return null;

  await query(`UPDATE sessions SET last_seen_at = now() WHERE token_hash = $1`, [tokenHash]);

  return rows[0];
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export function getClientIp(): string | undefined {
  const h = headers();
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    undefined
  );
}

export async function logAudit(userId: string | null, action: string, metadata?: any) {
  await query(
    `INSERT INTO audit_log (user_id, action, metadata, ip) VALUES ($1, $2, $3, $4)`,
    [userId, action, metadata ? JSON.stringify(metadata) : null, getClientIp() ?? null]
  );
}
