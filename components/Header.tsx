import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-[15px] tracking-tight font-medium hover:text-muted transition-colors">
          processing<span className="text-faint">/</span>platform
        </Link>
        <nav className="flex items-center gap-7 text-[13px] text-muted">
          <Link href="/#product" className="hover:text-fg transition-colors">Продукт</Link>
          <Link href="/#how" className="hover:text-fg transition-colors">Как работает</Link>
          <Link href="/#pricing" className="hover:text-fg transition-colors">Тарифы</Link>
          <span className="w-px h-4 bg-border" />
          {user ? (
            <Link href="/dashboard" className="text-fg hover:text-muted transition-colors">
              Кабинет ↗
            </Link>
          ) : (
            <>
              <Link href="/login" className="hover:text-fg transition-colors">Войти</Link>
              <Link href="/signup" className="text-fg hover:text-muted transition-colors">
                Начать →
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
