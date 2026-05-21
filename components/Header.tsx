import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="border-b border-gray-800/80 backdrop-blur sticky top-0 z-50 bg-gray-950/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="w-7 h-7 rounded-md bg-brand grid place-items-center text-gray-950 text-sm">P</span>
          <span>processing<span className="text-brand">.platform</span></span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              <Link href="/dashboard" className="px-3 py-1.5 rounded-md hover:bg-gray-800 transition">Кабинет</Link>
              <span className="px-2 text-gray-500">{user.email}</span>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1.5 rounded-md hover:bg-gray-800 transition">Войти</Link>
              <Link href="/signup" className="px-3 py-1.5 rounded-md bg-brand text-gray-950 font-semibold hover:bg-brand/90 transition">Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
