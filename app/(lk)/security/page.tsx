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
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Безопасность</h1>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Активные сессии</h2>
        <div className="rounded-xl bg-gray-900/50 border border-gray-800 divide-y divide-gray-800">
          {sessions.length === 0 && <div className="p-5 text-sm text-gray-500">Сессий нет</div>}
          {sessions.map((s) => (
            <div key={s.id} className="p-4 text-sm flex justify-between gap-4">
              <div>
                <div className="font-medium truncate max-w-md">{s.user_agent || "—"}</div>
                <div className="text-xs text-gray-500 mt-1">IP: {s.ip || "—"} · {new Date(s.created_at).toLocaleString("ru-RU")}</div>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                активна {new Date(s.last_seen_at).toLocaleTimeString("ru-RU")}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">API-токены</h2>
        <div className="rounded-xl bg-gray-900/50 border border-gray-800 p-5 text-sm text-gray-500">
          Управление API-токенами появится в следующем релизе.
        </div>
      </section>

      <section>
        <LogoutButton className="text-red-400 hover:text-red-300 text-sm transition" />
      </section>
    </div>
  );
}
