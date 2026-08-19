# Current checkpoint

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
- Promotions slice verification: formatting, whitespace validation and isolated TSX
  parsing pass; the full dependency-backed gate and browser UAT remain pending in this
  fresh workspace.
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
