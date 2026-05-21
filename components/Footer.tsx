import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-[13px]">
        <div className="col-span-2 md:col-span-1">
          <div className="font-medium text-fg mb-3">processing/platform</div>
          <p className="text-faint leading-relaxed">
            Партнёрский эквайринг через сеть ИП.
          </p>
        </div>
        <FCol title="Продукт">
          <FLink href="/#product">Возможности</FLink>
          <FLink href="/#how">Как работает</FLink>
          <FLink href="/#pricing">Тарифы</FLink>
        </FCol>
        <FCol title="Документация">
          <FLink href="/api/health">Status API</FLink>
          <FLink href="#">API reference</FLink>
          <FLink href="#">Webhooks</FLink>
        </FCol>
        <FCol title="Компания">
          <FLink href="https://github.com/simba-stack/processing-platform" external>GitHub</FLink>
          <FLink href="#">Контакты</FLink>
          <FLink href="#">Условия</FLink>
        </FCol>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-6 text-[12px] text-faint flex justify-between">
          <span>© {new Date().getFullYear()} processing/platform</span>
          <span>build 0.3.0 · fra-1</span>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-faint mb-3 text-[12px] uppercase tracking-wider">{title}</div>
      <div className="space-y-2 text-muted">{children}</div>
    </div>
  );
}

function FLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="block hover:text-fg transition-colors"
    >
      {children}
    </Link>
  );
}
