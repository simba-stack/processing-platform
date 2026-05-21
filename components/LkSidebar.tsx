"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Дашборд", icon: "📊" },
  { href: "/profile", label: "Профиль", icon: "👤" },
  { href: "/security", label: "Безопасность", icon: "🔐" }
];

export function LkSidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:w-56 flex-shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 whitespace-nowrap ${
                active
                  ? "bg-brand/10 text-brand border border-brand/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <span>{it.icon}</span>
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
