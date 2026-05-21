import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Профиль</h1>
      <div className="space-y-4">
        <Field label="ID" value={user.id} mono />
        <Field label="Email" value={user.email} />
        <Field label="Имя" value={user.display_name ?? "—"} />
        <Field label="Роль" value={user.role} />
        <Field label="Статус" value={user.status} />
        <Field label="Зарегистрирован" value={new Date(user.created_at).toLocaleString("ru-RU")} />
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</div>
      <div className={mono ? "font-mono text-sm" : ""}>{value}</div>
    </div>
  );
}
