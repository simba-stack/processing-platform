"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Обзор" },
  { href: "/profile", label: "Профиль" },
  { href: "/security", label: "Безопасность" }
];

export function LkSidebar() {
  const pathname = usePathname();
  return (
    <aside className="md:w-48 flex-shrink-0">
      <div className="eyebrow mb-4 hidden md:block">Кабинет</div>
      <nav className="flex md:flex-col gap-px md:gap-1 overflow-x-auto md:overflow-visible text-[13px]">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`px-3 py-2 transition-colors whitespace-nowrap ${
                active
                  ? "text-fg bg-surface md:bg-transparent md:border-l md:border-fg md:pl-3"
                  : "text-muted hover:text-fg md:border-l md:border-transparent md:pl-3"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
