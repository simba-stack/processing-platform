import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const [{ c: tokens } = { c: "0" }] = await query<{ c: string }>(
    `SELECT count(*)::text as c FROM api_tokens WHERE user_id = $1 AND revoked_at IS NULL`,
    [user.id]
  );
  const [{ c: sessions } = { c: "0" }] = await query<{ c: string }>(
    `SELECT count(*)::text as c FROM sessions WHERE user_id = $1 AND expires_at > now()`,
    [user.id]
  );

  const greeting = user.display_name || user.email.split("@")[0];

  return (
    <div className="space-y-16">
      <header>
        <div className="eyebrow mb-3">Обзор</div>
        <h1 className="h-section text-[36px]">{greeting}</h1>
        <p className="mt-3 text-[14px] text-muted">
          Партнёрский аккаунт · {user.role} · активен с {new Date(user.created_at).toLocaleDateString("ru-RU")}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 border border-border/60">
        <Cell label="Оборот за сутки" value="₽0" hint="нет активных ИП" />
        <Cell label="Активных ИП" value="0" hint="KYC ещё не пройден" />
        <Cell label="Депозит USDT" value="0.00" hint="лимит не активен" last />
      </section>

      <section>
        <div className="eyebrow mb-6">Следующие шаги</div>
        <div className="space-y-px bg-border/60 border border-border/60">
          <Step done text="Создать аккаунт" />
          <Step text="Пройти KYC" href="#" />
          <Step text="Подключить первого ИП" href="#" muted />
          <Step text="Внести страховой депозит USDT" href="#" muted />
          <Step text="Запросить тестовый трафик" href="#" muted />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60 border border-border/60">
        <Box label="Сессии" value={sessions} link="/security" />
        <Box label="API-токены" value={tokens} link="/security" />
      </section>
    </div>
  );
}

function Cell({ label, value, hint, last }: { label: string; value: string; hint: string; last?: boolean }) {
  return (
    <div className={`p-6 ${last ? "" : "border-b md:border-b-0 md:border-r"} border-border/60`}>
      <div className="text-[12px] text-faint uppercase tracking-wider">{label}</div>
      <div className="mt-6 text-[28px] font-medium tracking-tight">{value}</div>
      <div className="mt-1 text-[12px] text-muted">{hint}</div>
    </div>
  );
}

function Step({ done, text, href, muted }: { done?: boolean; text: string; href?: string; muted?: boolean }) {
  const inner = (
    <div className={`px-5 py-3.5 bg-bg flex items-center gap-4 text-[14px] transition-colors ${href ? "hover:bg-surface cursor-pointer" : ""}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${done ? "bg-fg" : "bg-faint"}`} />
      <span className={done ? "text-faint line-through" : muted ? "text-muted" : "text-fg"}>{text}</span>
      {href && !done && <span className="ml-auto text-faint text-[12px]">→</span>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function Box({ label, value, link }: { label: string; value: string; link: string }) {
  return (
    <Link href={link} className="block p-6 bg-bg hover:bg-surface transition-colors">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[12px] text-faint uppercase tracking-wider">{label}</div>
          <div className="mt-4 text-[28px] font-medium tracking-tight">{value}</div>
        </div>
        <span className="text-faint text-[12px]">→</span>
      </div>
    </Link>
  );
}
