# Processing Platform

Партнёрская процессинговая площадка для приёма платежей через сеть ИП с криптовалютным страховым депозитом.

## Стек
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Деплой: Render (Web Service)

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Деплой

Push в `main` → Render автоматом ребилдит и деплоит (см. `render.yaml`).

## Структура

```
app/
  layout.tsx       # корневой лейаут
  page.tsx         # главная (лендинг)
  api/health/      # healthcheck endpoint
  globals.css      # глобальные стили
```

## API

- `GET /api/health` — статус сервиса
