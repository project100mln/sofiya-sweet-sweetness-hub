# SOFIYA Kazakh localization technical evidence

Status: `LOCAL_GATE_PASS_CANDIDATE_VALIDATION_IN_PROGRESS`.

## Scope boundary

- Base SHA: `008ec430b5093571720adda88c934b8f70b6474f`
- Candidate branch: `agent/sofiya-kazakh-language-completion-20260828`
- Russian public URLs: unchanged
- Kazakh prefix: `/kk`
- Production/main/DNS/database impact: none

## Implemented controls

| Control                   | Evidence                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Translation parity        | Typed `uiMessages` registry; one literal key per `t()` call enforced by TypeScript and unit source scan                                |
| Translator surface        | Reproducible `KK_TRANSLATION_REGISTER.tsv` with 633 source/draft/context rows; freshness check in `npm run check`                      |
| Catalogue invariants      | 53 products and 9 categories localized; IDs, slugs, category IDs, prices, variant prices, flags and images compared RU↔KK              |
| Content invariants        | 17 stores, 3 news items and 2 promotions localized; contacts, coordinates, links, dates and promotion rules compared RU↔KK             |
| Runtime content guard     | Russian Supabase promotions remain visible; `/kk` admits them only after exact ID/title and Kazakh copy are reviewed                   |
| Forms                     | Stable option IDs, localized validation, plausible phone validation, Asia/Almaty date boundary and language-specific WhatsApp payloads |
| Language switch           | SPA navigation preserves path/query/hash and the in-memory 11-step cake draft                                                          |
| Accessibility             | Modal focus entry/trap/Escape/scroll lock/focus return; localized labels/errors and mobile navigation coverage                         |
| Kazakh font coverage      | `/kk` display/body typography uses Inter, whose loaded faces cover every required Kazakh extended glyph; Playfair remains on Russian   |
| SEO                       | Complete RU/KK static/dynamic metadata, reciprocal canonical/hreflang/x-default, localized Product/Breadcrumb JSON-LD                  |
| Sitemap/SSR               | Self-starting verifier fetches all 140 pages and validates exact 70/70 families, 420 alternates, markup-language leaks and RU/KK 404s  |
| Responsive browser matrix | Suite is configured to check all 70 RU + 70 KK routes at 320, 375, 768 and 1440 px; CI Chromium evidence is still pending              |

## Local evidence collected before final candidate commit

- `npm run check`: PASS
- Prettier: PASS
- ESLint with zero allowed warnings: PASS
- TypeScript: PASS
- Unit suite: 27/27 PASS, including localization 15/15 and localized HTTP 500 fallback 3/3
- Cloudflare production build: PASS
- Node-server production build: PASS
- Secret scan: PASS
- Playwright discovery: 136 tests found across desktop/mobile projects
- Bilingual SSR verifier: PASS — 70 RU + 70 KK pages, 140 unique sitemap URLs,
  420 exact alternates, localized structured data and 404s
- Translation-register freshness: PASS — 633 rows
- `npm audit --omit=dev --package-lock-only --ignore-scripts`: PASS — 0 vulnerabilities

The exact candidate SHA, independent recheck, CI run URLs and isolated preview
verification must be recorded in the final handoff. This document does not substitute
for either human sign-off.

## Human gates that remain external

- Kazakh editorial: `WAITING_FOR_KK_EDITORIAL_SIGNOFF`
- Kazakh legal: `WAITING_FOR_KK_LEGAL_SIGNOFF`
- Production authorization: not granted
