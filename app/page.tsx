import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* HERO — asymmetric, no center mass */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-32">
        <Reveal>
          <div className="eyebrow mb-6">v0.3 · ранний доступ</div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="h-display text-[60px] md:text-[88px] max-w-4xl">
            Приём платежей.
            <br />
            <span className="text-muted">Распределённо по партнёрам.</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-10 max-w-xl text-[16px] text-muted leading-relaxed">
            Инфраструктура агентского эквайринга: вы вносите криптообеспечение,
            мы поднимаем лимит и автоматически направляем трафик через ваши ИП,
            не превышая дневных и месячных порогов.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 flex items-center gap-4">
            <Link
              href="/signup"
              className="px-5 py-2.5 text-[13px] font-medium bg-fg text-bg hover:bg-muted transition-colors"
            >
              Получить доступ
            </Link>
            <Link
              href="#product"
              className="link px-2 text-[13px] text-muted hover:text-fg"
            >
              Посмотреть продукт
            </Link>
          </div>
        </Reveal>

        {/* hero stats — discreet */}
        <Reveal delay={400}>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-8 max-w-3xl border-t border-border/60 pt-10">
            <Stat n="< 200ms" l="response p99" />
            <Stat n="99.95%" l="SLA процессинга" />
            <Stat n="7" l="методов оплаты" />
            <Stat n="T+1" l="расчёт по умолчанию" />
          </div>
        </Reveal>
      </section>

      {/* MARQUEE — "supported by" feel */}
      <section className="border-y border-border/60 py-5 overflow-hidden">
        <div className="flex marquee whitespace-nowrap text-[12px] text-faint">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6 shrink-0">
              {["СБП", "Visa", "Mastercard", "МИР", "USDT TRC-20", "USDT ERC-20", "TON", "Webhooks", "REST API", "gRPC"].map((s) => (
                <span key={`${k}-${s}`} className="tracking-wider uppercase">{s}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT — list, not cards */}
      <section id="product" className="max-w-6xl mx-auto px-6 py-32">
        <Reveal>
          <div className="eyebrow mb-4">Продукт</div>
          <h2 className="h-section text-[40px] md:text-[56px] max-w-3xl">
            Каждый платёж проходит через
            <br />
            подходящий по лимиту реквизит.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-2 border-t border-border/60">
          <ProductRow
            n="01"
            title="Smart router"
            desc="Подбор реквизита по дневному и месячному лимиту, скользящему окну, здоровью карты, географии плательщика. С резервированием оборота при создании транзакции."
          />
          <ProductRow
            n="02"
            title="Криптообеспечение"
            desc="HD-кошельки на партнёра, watchers по блокчейну, ликвидация при margin call. Лимит партнёра = коэффициент × депозит."
          />
          <ProductRow
            n="03"
            title="Anti-overflow"
            desc="Жёсткий cap по обороту через PG advisory locks. Никаких превышений УСН 60M ₽/год и блокировок счетов."
          />
          <ProductRow
            n="04"
            title="Webhooks с HMAC"
            desc="Идемпотентные доставки, экспоненциальный retry, dead-letter queue. JS/Python/PHP SDK."
          />
          <ProductRow
            n="05"
            title="Audit + 2FA"
            desc="Каждое действие в неизменяемом логе. TOTP, API-токены с гранулярными правами и автоматической ротацией."
          />
        </div>
      </section>

      {/* HOW IT WORKS — horizontal steps */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-32 border-t border-border/60">
        <Reveal>
          <div className="eyebrow mb-4">Процесс</div>
          <h2 className="h-section text-[40px] md:text-[56px] max-w-3xl">
            От регистрации до выплаты —
            <br />
            <span className="text-muted">5 шагов.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-5 gap-px bg-border/60 border border-border/60">
          <Step n="01" t="Регистрация" d="Email, пароль, 2FA" />
          <Step n="02" t="KYC ИП" d="ОГРНИП, паспорт, выписка" />
          <Step n="03" t="Депозит USDT" d="Лимит = K × депозит" />
          <Step n="04" t="Подключение" d="Реквизиты, API-токен" />
          <Step n="05" t="Поток" d="Выплаты в USDT по графику" />
        </div>
      </section>

      {/* PRICING — minimal */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-32 border-t border-border/60">
        <Reveal>
          <div className="eyebrow mb-4">Тарифы</div>
          <h2 className="h-section text-[40px] md:text-[56px] max-w-3xl">
            Без абонентки.
            <br />
            <span className="text-muted">Процент с оборота.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border border-border/60">
          <Price tier="Starter" pct="2.4%" d="до 5M ₽ оборота / месяц" />
          <Price tier="Growth" pct="1.8%" d="5M – 30M ₽" emphasis />
          <Price tier="Scale" pct="индив." d="от 30M ₽" />
        </div>

        <Reveal delay={200}>
          <div className="mt-10 max-w-2xl text-[13px] text-muted leading-relaxed">
            Reserve fund 5% удерживается 180 дней. Hold по умолчанию T+1, для новых партнёров — T+3.
            Депозит USDT возвращается через 72 часа cool-down после запроса.
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-32 border-t border-border/60">
        <Reveal>
          <h2 className="h-display text-[48px] md:text-[72px] max-w-3xl">
            Готовы запустить
            <br />
            <span className="text-muted">первый поток?</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/signup"
              className="px-5 py-2.5 text-[13px] font-medium bg-fg text-bg hover:bg-muted transition-colors"
            >
              Создать аккаунт
            </Link>
            <Link href="mailto:hi@processing.local" className="link text-[13px] text-muted hover:text-fg">
              Связаться с командой
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-[24px] font-medium tracking-tight">{n}</div>
      <div className="text-[12px] text-faint mt-1 uppercase tracking-wider">{l}</div>
    </div>
  );
}

function ProductRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <>
      <Reveal as="div" className="md:col-span-1 pt-8 text-[12px] text-faint tracking-wider">{n}</Reveal>
      <Reveal as="div" className="md:col-span-3 pt-8 text-[18px] font-medium tracking-tight border-t-0 md:border-t border-border/60">
        {title}
      </Reveal>
      <Reveal as="div" delay={50} className="md:col-span-8 pt-8 pb-8 text-[15px] text-muted leading-relaxed border-t border-border/60">
        {desc}
      </Reveal>
    </>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="bg-bg p-6 md:p-7 hover:bg-surface transition-colors">
      <div className="text-[11px] text-faint tracking-wider">{n}</div>
      <div className="mt-8 text-[15px] font-medium">{t}</div>
      <div className="mt-1 text-[13px] text-muted">{d}</div>
    </div>
  );
}

function Price({ tier, pct, d, emphasis }: { tier: string; pct: string; d: string; emphasis?: boolean }) {
  return (
    <div className={`p-8 ${emphasis ? "bg-surface" : ""} border-r border-border/60 last:border-r-0`}>
      <div className="text-[12px] text-faint uppercase tracking-wider">{tier}</div>
      <div className="mt-8 text-[40px] font-medium tracking-tight">{pct}</div>
      <div className="mt-2 text-[13px] text-muted">{d}</div>
    </div>
  );
}
