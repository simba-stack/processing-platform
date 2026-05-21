import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-glow">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            MVP — закрытое бета-тестирование
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Приём платежей через
            <br />
            <span className="text-brand">сеть партнёров</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Процессинговая площадка с автоматическим распределением входящих платежей
            по сети ИП и криптовалютным страховым депозитом.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-brand text-gray-950 rounded-lg font-semibold hover:bg-brand/90 transition"
            >
              Стать партнёром
            </Link>
            <a
              href="#how"
              className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:border-brand hover:text-brand transition"
            >
              Как это работает
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gray-500 uppercase tracking-wider">
            <span>СБП</span><span>·</span>
            <span>P2P-карты</span><span>·</span>
            <span>USDT TRC-20</span><span>·</span>
            <span>API + Webhooks</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24" id="how">
        <div className="text-center mb-16">
          <div className="text-brand text-sm font-semibold uppercase tracking-wider mb-3">Возможности</div>
          <h2 className="text-3xl md:text-4xl font-bold">Всё для платёжной автоматизации</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            icon="🎯"
            title="Smart Routing"
            desc="Автоматическое распределение трафика по партнёрам с учётом лимитов, оборотов и здоровья реквизитов."
          />
          <Feature
            icon="🪙"
            title="Crypto Insurance"
            desc="Страховой депозит в USDT — обеспечение для активации лимита партнёра без отдельных переводов."
          />
          <Feature
            icon="🛡️"
            title="Anti-overflow"
            desc="Жёсткие лимиты по дню/месяцу с резервированием оборота. Никаких превышений и блокировок счетов."
          />
          <Feature
            icon="⚡"
            title="Webhooks + SDK"
            desc="REST API, HMAC-подписи, JS/PHP/Python SDK. Интеграция за час, не за неделю."
          />
          <Feature
            icon="📊"
            title="Real-time analytics"
            desc="Live-дашборд: GMV, success rate, конверсия. Экспорт в CSV/Excel."
          />
          <Feature
            icon="🔐"
            title="2FA + аудит"
            desc="TOTP, журнал всех действий, гранулярные API-токены под каждую интеграцию."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-brand text-sm font-semibold uppercase tracking-wider mb-3">Процесс</div>
            <h2 className="text-3xl md:text-4xl font-bold">5 шагов до первой выплаты</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <StepBig n={1} title="Регистрация" desc="Email + пароль, активация магического токена" />
            <StepBig n={2} title="KYC" desc="Загрузка документов ИП, валидация ЕГРИП" />
            <StepBig n={3} title="Депозит" desc="Внесение USDT на персональный кошелёк партнёра" />
            <StepBig n={4} title="Лимит" desc="Активация торгового лимита, подключение реквизитов" />
            <StepBig n={5} title="Поток" desc="Приём платежей, авто-выплаты в USDT по расписанию" />
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Готов запустить свой <span className="text-brand">первый поток</span>?
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Регистрация занимает минуту. Депозит вносится только после прохождения KYC.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-brand text-gray-950 rounded-lg font-bold text-lg hover:bg-brand/90 transition"
        >
          Создать партнёрский аккаунт →
        </Link>
      </section>
    </>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-brand/50 hover:bg-gray-900/80 transition group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-brand transition">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function StepBig({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="text-center">
      <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/30 grid place-items-center text-brand font-bold mx-auto mb-4">
        {n}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </li>
  );
}
