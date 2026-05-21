"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, display_name: name || undefined })
      });
      const j = await res.json();
      if (!res.ok) {
        if (j.error === "email_taken") throw new Error("Этот email уже зарегистрирован");
        if (j.error === "invalid_input") throw new Error("Проверьте корректность email и пароля (минимум 8 символов)");
        throw new Error("Не удалось создать аккаунт");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3rem)] grid place-items-center px-6">
      <div className="w-full max-w-[320px]">
        <div className="eyebrow mb-8">Регистрация партнёра</div>
        <form onSubmit={submit} className="space-y-6">
          <Input label="Имя или название" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван И." />
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <Input label="Пароль" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" hint="минимум 8 символов" />
          {error && <div className="text-[12px] text-red-400/80">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-[13px] font-medium bg-fg text-bg hover:bg-muted transition-colors disabled:opacity-40"
          >
            {loading ? "Создаём..." : "Создать аккаунт →"}
          </button>
        </form>
        <div className="mt-8 text-[12px] text-faint leading-relaxed">
          Есть аккаунт? <Link href="/login" className="link text-muted hover:text-fg">Войти</Link>
          <br/><br/>
          Регистрируясь, вы соглашаетесь с условиями использования.
          KYC начнётся после первого входа в кабинет.
        </div>
      </div>
    </main>
  );
}
