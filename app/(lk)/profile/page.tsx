import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <div className="space-y-12 max-w-2xl">
      <header>
        <div className="eyebrow mb-3">Профиль</div>
        <h1 className="h-section text-[36px]">{user.display_name || user.email.split("@")[0]}</h1>
      </header>

      <div className="border border-border/60 divide-y divide-border/60">
        <Row k="ID" v={user.id} mono />
        <Row k="Email" v={user.email} />
        <Row k="Имя" v={user.display_name ?? "—"} />
        <Row k="Роль" v={user.role} />
        <Row k="Статус" v={user.status} />
        <Row k="Зарегистрирован" v={new Date(user.created_at).toLocaleString("ru-RU")} />
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="text-[12px] text-faint uppercase tracking-wider">{k}</div>
      <div className={`md:col-span-2 text-[14px] ${mono ? "font-mono text-[12px] text-muted" : ""}`}>{v}</div>
    </div>
  );
}
