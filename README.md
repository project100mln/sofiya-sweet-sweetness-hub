# SOFIYA — sofiya-site

Публичный сайт кондитерской/пекарни SOFIYA.

## Перед каждым пушем

Обязательно прогонять `bun run lint` и `tsc --noEmit` (с включённым
`noUnusedLocals`/`noUnusedParameters` в tsconfig.json) — Lovable строже
реагирует на неиспользуемые импорты/переменные, чем стандартная сборка
Vite (`bun run build` их не ловит).

## Deployment

Production (`sofiyabakery.com`) is built by Cloudflare Workers Builds from the `main` branch of this repository (connected 2026-10-21). Every merge to `main` triggers `npm ci && npm run build:cloudflare` and `npx wrangler deploy --config wrangler.jsonc --env production`.
