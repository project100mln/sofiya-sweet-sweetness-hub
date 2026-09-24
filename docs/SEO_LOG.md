# Журнал SEO

## 2026-09-23 / SEO-00

Цель: устойчивый контекст, карта и проверяемые задачи. Ответственный Codex.
Scope: только docs/AGENTS; приложение/дизайн/production/оплаты исключены.
Base remote #8 57ef3dc, ветка agent/sofiya-seo-governance-20260923.
D01: активная цель SEO, не редизайн. D02: #7 сердце/hero обязательно в едином релизе.
D03: GSC Wizard не единственный путь статистики. D04: история сохраняется,
активные документы SEO_* имеют приоритет. D05: файл не означает изменение settings ChatGPT.
SEO-00 DONE: https://github.com/project100mln/sofiya-sweet-sweetness-hub/pull/9 .
Документационный commit f0edfd55cf936e7dad9293e2c3335a5fbd4bf4a1.
Prettier, git diff --check, наличие 17 ID и входных источников PASS.
Тесты приложения не запускались: изменена только документация.
SOFIYA_CHATGPT_PROJECT_SETUP.md сохранён как пользовательский документ;
поле инструкций/закрепление UI не изменены, ручной шаг раскрыт.
Terminal push без credentials не сработал; сохранено через подключённый GitHub.
Откат — revert docs commit.
Следующий этап SEO-02. Production остаётся owner gate.

## Шаблон следующей записи

### 2026-09-23 — SEO-02: единый кандидат, IMPLEMENTED

Основа 0c10e31 (#9, включает #8), второй родитель 83eff575 (#7).
Ветка agent/sofiya-seo-integration-20260923. Конфликты hero разрешены с сохранением
чистого URL /catalog/cakes и положения фото 56% 32%; второй слой изображения удалён.
favicon.ico и favicon.svg — оригинальные файлы #7. Удалены SofiyaBrandText и его
два теста реализации; во всех предложениях сохранён текст, отдельные брендовые элементы сохранены.
Убрана косметическая замена SOFIYA Club в AppPromo. Реестр KK пересобран (704 строки),
это не редакторское утверждение. Другие worktree сохранены.
PASS: typecheck, lint, format:check, 28 unit; node и Cloudflare build;
SSR 75 RU + 75 KK, canonical/hreflang, sitemap 450 alternates, 404; secret:scan.
Первичная локальная браузерная проверка заблокирована: download Chromium failed.
Затем GitHub CI Quality #112 завершился PASS на fe415810bb79675abe8904341abc22d8e69c05d5:
28 unit; 159 browser passed, 25 skipped (не PASS). Draft PR #10.
https://github.com/project100mln/sofiya-sweet-sweetness-hub/actions/runs/35866082173
Артефакт localization-visual-evidence 10751479163 создан (4676582 bytes).
Получение ZIP для визуального осмотра вернуло HTTP 403; изображения не осмотрены.
Статус IMPLEMENTED: техническая проверка PASS, визуальная приёмка остаётся.
Сравнение мультимножеств всех 704 RU/KK пар и review_status с #8: неизменны.
favicon ICO/SVG побайтно идентичны #7. Local и remote tree совпадают: 2f097ba.
Откат: revert integration commit. Production не изменён.
Правило владельца: после каждого этапа обновлять карту в чате, не отправлять его в GitHub.

Дата / ID / результат / scope и exclusions / зависимости / ответственный / branch/base.
Файлы/URL / candidate SHA / команды и результаты / evidence links / пропуски.
Статус / риск / откат / blocker / следующий шаг / разрешение релиза если было.

## 2026-09-23 — SEO-02 DONE, SEO-06 DONE, SEO-07 IMPLEMENTED

Владелец исполнения Codex; base PR10 0ade25b, код fe415810. Production вне scope.
SEO-02: существующий preview PR10 визуально проверен через браузер (desktop1363px),
RU/KK cakes/preorder, hero/footer/heart; подробности docs/SEO_VISUAL_REVIEW.md.
SEO-06: карта намерений/URL в docs/SEO_QUERY_MAP.md. Источники SOFIYA/Safia;
частотности и позиций нет. Сафия не используется как автоматическая опечатка.
SEO-07: главная, about, desserts, footer; без новых страниц и смены дизайна.
Цель — явно описать кондитерскую в Шымкенте и сладости, добавить «София»;
название footer приведено к SOFIYA по решению владельца.
PASS локально: typecheck, lint, 28 unit, SSR150/450. Реестр KK706 строк.
Новые KK тексты — draft; редактор не утверждал. Новый CI/preview ещё требуется.
Риск: поисковый эффект не измерен; GSC недоступен. Откат: revert SEO-07 commit.
Следующее: QA нового SHA, аудит локальных карточек/аналитики; без публикации.
