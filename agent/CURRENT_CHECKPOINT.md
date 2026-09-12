# Current checkpoint

## 2026-09-11 — isolated hero/favicon task

- Branch: `agent/sofiya-hero-favicon-20260911`, based on current main
  `95797652c06e8c1dc14e0a57498084f3c0342649`.
- The first-slide seam was reproduced on production in RU/KK at 1363 × 936.
  The duplicate 76%-width photo layer is removed in the local candidate.
- Original SOFIYA heart SVG and 16/32/48 ICO are prepared with versioned links.
- Local format/lint/types, 27 unit tests, translation invariance, both builds,
  Worker verification, bilingual SSR, icon HTTP checks and secret scan passed.
- Visual acceptance is BLOCKED: Cloud Browser cannot reach local preview;
  Cloudflare dashboard requires human verification. Responsive after screenshots,
  actual browser-tab favicon and browser regression remain pending.
- Push is withheld until external build triggers are verified. No PR, merge,
  production deploy, DNS or hosting changes were made.
- Detailed evidence and remaining checks:
  `docs/qa/hero-favicon-20260911/REPORT.md`.

## Historical public-site checkpoint (previous task)

- Branch: `agent/polish-public-site-v1`
- Base: `main` at `7f38a8ef401e9af256285a9fab4c6374f96779cb`
- Scope: Public Site v1 as defined in `docs/PUBLIC_SITE_V1.md`
- Completed slice: portable first-party assets, graceful Supabase fallback, RLS
  hardening migration, honest WhatsApp hand-offs, configurable TikTok, SEO files and
  structured data, accessibility polish, regression tests and CI.
- Completed promotions slice: two approved happy-hours offers are now first-party
  content on `/promotions`; poster copy was moved into accessible card titles and
  descriptions, while the cleaned 16:10 food imagery retains only the `-20%` and
  `20:00–22:00` discount medallion. The samsa scene now uses the approved warm tabletop
  styling, and both assets were optimized to WebP.
- Promotions slice verification: GitHub Quality and Vercel passed for commit
  `6cd17b3d137d1ba43515c6dae02da3bb58992994`; desktop browser UAT confirmed both
  images and card copy render without site console errors.
- Promotions interaction follow-up: the two featured cards now link to dedicated detail
  pages, show the participating product names in their visible descriptions, and expose
  the full product lists, offer hours and WhatsApp clarification action after navigation.
- Homepage news-and-promotions navigation follow-up: the section now links directly to
  `/promotions`; the loyalty card opens its dedicated event article, the cake card opens
  `/cake-preorder`, and the network-growth card opens `/stores`. The same destination
  behavior is reused on the full news page.
- Green local gate: `npm --offline run check` (format, lint, typecheck, 8 unit tests,
  production build and secret scan). Full dependency audit reports 0 vulnerabilities.
- SSR route matrix: public routes return 200/redirect as expected; designed unknown
  routes return 404; product pages render one canonical and three JSON-LD blocks.
- Pull Request: GitHub Draft PR #1 with sequential commits on top of `main`.
- CI status: `quality` and `browser-smoke` are green. Desktop and iPhone-size Chromium
  smoke tests cover public routes, catalogue filtering/sorting, mobile navigation,
  WhatsApp hand-off, confirmed social links and the designed 404.
- Browser status: the published `main` visual baseline was inspected at 1363 × 936.
  Branch Preview UAT remains pending a preview host. Lovable only tracks `main`; the
  connected Vercel account requires explicit authorization to create a new public
  project for this repository.

## Owner gates

1. Official TikTok profile URL and public handle.
2. Confirm the canonical custom domain, or approve the current Lovable URL as canonical.
3. Confirm the 19 published locations, their hours/maps, and the two public phone sets
   (`+7 707 558 06 05` and `+7 778 558 06 05`).
4. Apply and verify `20260816090000_harden_public_promotions.sql` in the connected
   Supabase project; no production database credentials are present locally.
5. Authorize a new Vercel Preview project for this repository, or choose merging the
   Draft PR into Lovable-connected `main` as the preview route.

## Files to read next

1. `docs/PUBLIC_SITE_V1.md`
2. `agent/WORK_QUEUE.md`
3. `.github/workflows/quality.yml`
4. `src/config/site.ts`
5. Current Pull Request and CI result

Update this file after every completed delivery slice.
