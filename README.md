# Processing Platform

Партнёрская процессинговая площадка для приёма платежей через сеть ИП с криптовалютным страховым депозитом.

## Стек
- Next.js 14 (App Router) + TypeScript + Tailwind
- PostgreSQL (Render free tier)
- bcryptjs + jose (JWT в HttpOnly cookie)
- Деплой: Render (auto-deploy from GitHub main)

## Структура

```
app/
  page.tsx              # лендинг
  layout.tsx            # root layout (Header + Footer)
  login/page.tsx        # форма входа
  signup/page.tsx       # форма регистрации
  (lk)/                 # защищённые роуты ЛК
    layout.tsx          # sidebar + content
    dashboard/page.tsx
    profile/page.tsx
    security/page.tsx
  api/
    auth/{signup,login,logout}/route.ts
    health/route.ts
lib/
  db.ts                 # PG pool
  auth.ts               # sessions, JWT, hashing
  schema.sql            # DB migrations
components/             # UI components
middleware.ts           # защита /(lk) роутов
scripts/migrate.mjs     # runner для schema.sql
```

## Env vars

| | |
|---|---|
| `DATABASE_URL` | Postgres connection string (Render задаёт автоматом) |
| `SESSION_SECRET` | 32+ символа, для JWT-подписи сессий |
| `NODE_ENV` | `production` на проде |

## Локально

```bash
npm install
export DATABASE_URL="postgres://..."
export SESSION_SECRET="..."
npm run db:migrate
npm run dev
```

## Миграция БД на проде

После деплоя выполнить миграцию через Render Shell:
```bash
npm run db:migrate
```

## API

- `GET /api/health` — статус + проверка БД
- `POST /api/auth/signup` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/logout` — выход
