"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message === "invalid_credentials" ? "Неверный email или пароль" : "Не удалось войти");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] grid place-items-center px-6">
      <div className="w-full max-w-[320px]">
        <div className="eyebrow mb-8">Вход</div>
        <form onSubmit={submit} className="space-y-6">
          <Input label="Email" type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <Input label="Пароль" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          {error && <div className="text-[12px] text-red-400/80">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-[13px] font-medium bg-fg text-bg hover:bg-muted transition-colors disabled:opacity-40"
          >
            {loading ? "Входим..." : "Войти →"}
          </button>
        </form>
        <div className="mt-8 text-[12px] text-faint">
          Нет аккаунта? <Link href="/signup" className="link text-muted hover:text-fg">Создать</Link>
        </div>
      </div>
    </main>
  );
}
