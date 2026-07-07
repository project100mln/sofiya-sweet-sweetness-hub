# SOFIYA — sofiya-site

Публичный сайт кондитерской/пекарни SOFIYA.

## Перед каждым пушем

Обязательно прогонять `bun run lint` и `tsc --noEmit` (с включённым
`noUnusedLocals`/`noUnusedParameters` в tsconfig.json) — Lovable строже
реагирует на неиспользуемые импорты/переменные, чем стандартная сборка
Vite (`bun run build` их не ловит).
