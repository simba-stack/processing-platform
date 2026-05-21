import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  const [tokens] = await query<{ c: string }>(
    `SELECT count(*)::text as c FROM api_tokens WHERE user_id = $1 AND revoked_at IS NULL`,
    [user.id]
  );
  const [sessions] = await query<{ c: string }>(
    `SELECT count(*)::text as c FROM sessions WHERE user_id = $1 AND expires_at > now()`,
    [user.id]
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Привет, {user.display_name || user.email.split("@")[0]}</h1>
      <p className="text-gray-400 mb-8">Партнёрский кабинет · роль: {user.role}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Stat label="Оборот за день" value="₽0" hint="Подключите ИП чтобы начать" />
        <Stat label="Активных ИП" value="0" hint={<Link href="#" className="text-brand hover:underline">+ добавить</Link>} />
        <Stat label="Депозит USDT" value="0.00" hint="Внесите для активации лимита" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Старт работы">
          <ol className="space-y-3 text-sm">
            <Step n={1} done>Создать аккаунт</Step>
            <Step n={2}>Пройти KYC (загрузить документы)</Step>
            <Step n={3}>Подключить первого ИП</Step>
            <Step n={4}>Внести страховой депозит USDT</Step>
            <Step n={5}>Получить тестовый трафик</Step>
          </ol>
        </Card>

        <Card title="Безопасность">
          <div className="space-y-3 text-sm">
            <Row k="Активных сессий" v={sessions?.c ?? "0"} />
            <Row k="API-токенов" v={tokens?.c ?? "0"} />
            <Row k="2FA" v={<span className="text-yellow-400">не включена</span>} />
          </div>
          <Link href="/security" className="text-brand text-sm hover:underline mt-4 inline-block">Настройки безопасности →</Link>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</div>
      <div className="text-3xl font-bold text-brand mb-1">{value}</div>
      <div className="text-xs text-gray-500">{hint}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Step({ n, done, children }: { n: number; done?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold flex-shrink-0 ${done ? "bg-brand text-gray-950" : "bg-gray-800 text-gray-400"}`}>
        {done ? "✓" : n}
      </span>
      <span className={done ? "text-gray-500 line-through" : ""}>{children}</span>
    </li>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
