export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          в разработке
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Processing
          <span className="block text-brand">Platform</span>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-xl">
          Партнёрская процессинговая площадка с криптовалютным страховым депозитом
          и автоматическим распределением платежей по сети ИП.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <Feature title="Smart routing" desc="Автораспределение по партнёрам с anti-overflow" />
          <Feature title="Crypto deposit" desc="Страховое обеспечение в USDT" />
          <Feature title="API + Webhooks" desc="Прозрачная интеграция для мерчантов" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="px-6 py-3 bg-brand text-gray-900 rounded-lg font-semibold hover:bg-brand/90 transition text-center"
          >
            Войти в кабинет
          </a>
          <a
            href="#"
            className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:border-brand hover:text-brand transition text-center"
          >
            Документация API
          </a>
        </div>

        <footer className="mt-24 pt-8 border-t border-gray-800 text-sm text-gray-500">
          MVP build · {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-brand/50 transition">
      <h3 className="font-semibold text-brand mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
