"use client";
import { useState } from "react";

export function LogoutButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/";
  }
  return (
    <button onClick={logout} disabled={loading} className={className}>
      {loading ? "Выходим..." : "Выйти из аккаунта"}
    </button>
  );
}
