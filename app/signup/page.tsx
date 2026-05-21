"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
        body: JSON.stringify({ email, password, display_name: displayName || undefined })
      });
      const j = await res.json();
      if (!res.ok) {
        if (j.error === "email_taken") throw new Error("Этот email уже зарегистрирован");
        throw new Error("Ошибка регистрации");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Регистрация партнёра</h1>
          <p className="text-sm text-gray-400 mt-1">уже есть аккаунт? <Link href="/login" className="text-brand hover:underline">Войти</Link></p>
        </div>
        <Input label="Имя или название" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Иван И." />
        <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <Input label="Пароль" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="минимум 8 символов" />
        {error && <div className="text-sm text-red-400 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">{error}</div>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Создаём..." : "Создать аккаунт"}
        </Button>
        <p className="text-xs text-gray-500 text-center pt-2">
          Регистрируясь, вы соглашаетесь с условиями использования
        </p>
      </form>
    </main>
  );
}
