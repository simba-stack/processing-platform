import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { LogoutButton } from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const user = await requireUser();
  const sessions = await query<{ id: string; user_agent: string; ip: string; created_at: string; last_seen_at: string }>(
    `SELECT id, user_agent, ip, created_at, last_seen_at FROM sessions
     WHERE user_id = $1 AND expires_at > now() ORDER BY last_seen_at DESC`,
    [user.id]
  );

  return (
    <div className="space-y-16">
      <header>
        <div className="eyebrow mb-3">Безопасность</div>
        <h1 className="h-section text-[36px]">Сессии и доступ</h1>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[15px] font-medium">Активные сессии</h2>
          <span className="text-[12px] text-faint">{sessions.length}</span>
        </div>
        <div className="border border-border/60 divide-y divide-border/60">
          {sessions.length === 0 && (
            <div className="px-5 py-6 text-[13px] text-muted">Сессий нет</div>
          )}
          {sessions.map((s) => (
            <div key={s.id} className="px-5 py-4 flex items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="text-[13px] truncate">{s.user_agent || "—"}</div>
                <div className="text-[11px] text-faint mt-1 font-mono">
                  {s.ip || "—"} · {new Date(s.created_at).toLocaleString("ru-RU")}
                </div>
              </div>
              <div className="text-[11px] text-faint whitespace-nowrap">
                активна {new Date(s.last_seen_at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[15px] font-medium mb-4">API-токены</h2>
        <div className="border border-border/60 px-5 py-6 text-[13px] text-muted">
          Управление API-токенами появится в v0.4.
        </div>
      </section>

      <section className="pt-8 border-t border-border/60">
        <LogoutButton className="text-[13px] text-muted hover:text-red-400/90 transition-colors" />
      </section>
    </div>
  );
}
