# SOFIYA Sweet — premium public-site improvement plan

## Current milestone

Bring every public route to one premium, mobile-first design system. The approved
desktop reference is `../upload/951D7B87-FCD5-4F8B-92EF-A0CA1DF12404.jpeg`; it is
the visual truth for the header and home-page hero. The existing purple identity,
approved SOFIYA logos, real product photography, catalogue data, store data and
phase-one public-site boundaries remain in place.

## Scope boundaries

- In scope: public routes, navigation, catalogue discovery, product details,
  promotions, news, loyalty presentation, stores, map hand-offs, responsive
  behavior, accessibility, SEO, performance and automated/browser validation.
- Out of scope: cart, checkout, delivery, payments, customer accounts, iiko, 1C,
  CRM, staff administration and production DNS changes.
- Production publication remains an owner gate. Work may be committed and pushed
  to an `agent/*` branch after all local gates pass.

## Ordered vertical slices

### S1 — Baseline and acceptance contract

Outcome: one traceable source of truth for the approved design direction and
verification.

- [ ] Record numbered acceptance tests in `09_ACCEPTANCE_TESTS.md`.
- [ ] Capture the current desktop and mobile implementation before redesign.
- [ ] Preserve approved address corrections and already completed Public Site v1 work.

Dependencies: none.

Stop condition: conflicting business data, production-only access or an unresolved
request to remove approved logos.

### S2 — Header and approved hero

Outcome: the first screen faithfully follows the approved reference while remaining
responsive and fully interactive.

- [ ] Use the combined SOFIYA emblem + wordmark in the header; keep the SOFIYA mark
      visible on the photographed cake.
- [ ] Implement the compact desktop navigation, phone and WhatsApp action.
- [ ] Rebuild the hero as a full-bleed rounded carousel with readable editorial copy,
      gold CTA, arrows, progress indicators, pause and reduced-motion behavior.
- [ ] Create a mobile composition that keeps the product, message and CTA above the
      fold without horizontal overflow.

Dependencies: S1.

Rollback: revert S2 component/style commit; no data changes.

### S3 — Site-wide premium design system

Outcome: all public routes use the same typography, spacing, color, card, button,
focus and motion language.

- [ ] Consolidate section headings, surfaces, shadows, radii and responsive spacing.
- [ ] Align home, catalogue, product, stores, promotions, news, about, contacts,
      cake-preorder, catering, career and legal pages.
- [ ] Remove avoidable visual noise and keep purple as a controlled brand accent.

Dependencies: S2.

Rollback: revert token/component commits independently; no data changes.

### S4 — Catalogue and product interaction

Outcome: visitors can discover and inspect products faster, with polished movement
that never hides essential information.

- [ ] Improve category hierarchy, search/filter/sort controls and result feedback.
- [ ] Upgrade product cards with consistent imagery, badges and hover/focus/press
      states; preserve direct product detail navigation.
- [ ] Add subtle image motion and respect `prefers-reduced-motion`.
- [ ] Verify empty, loading and no-result states on desktop and mobile.

Dependencies: S3.

Rollback: revert catalogue UI commit; product data remains unchanged.

### S5 — Promotions, news and loyalty

Outcome: commercial stories are visually consistent, understandable and correctly
linked.

- [ ] Preserve the approved happy-hours content and product detail routes.
- [ ] Align promotion/news cards and destination behavior with the premium system.
- [ ] Keep the SOFIYA Club 5+1 sequence automatic and replayable; ensure the sixth
      cup is visibly highlighted for one second and reduced motion is safe.
- [ ] Verify all home-page cards reach their intended routes.

Dependencies: S3.

Rollback: revert presentation commits; approved content stays available.

### S6 — Stores, map and contact actions

Outcome: visitors can find a verified store and open directions without an
unfinished placeholder.

- [ ] Preserve the approved store list and corrected addresses.
- [ ] Replace the placeholder map with a useful interactive location surface or a
      verified map-link composition using existing store coordinates/URLs.
- [ ] Keep city filters, search, phone, WhatsApp and directions actions usable on
      narrow screens.
- [ ] Derive visible counts from the source data; do not publish guessed totals.

Dependencies: S3 and verified existing store records.

Stop condition: a store needs an unverified address or map URL.

Rollback: revert stores UI commit; source records remain intact.

### S7 — Mobile, accessibility, SEO and performance

Outcome: the complete public site is production-grade at phone and desktop sizes.

- [ ] Verify responsive layouts at 390 × 844, 768 × 1024 and 1440 × 1000.
- [ ] Verify keyboard navigation, visible focus, menu/dialog behavior, labels,
      contrast and reduced motion.
- [ ] Preserve canonical metadata, structured data, sitemap, graceful errors and
      first-party assets.
- [ ] Remove avoidable image/layout cost and verify no broken assets or console errors.

Dependencies: S2–S6.

Rollback: changes are isolated to UI/config/assets; no migration is involved.

### S8 — Quality and release-readiness gate

Outcome: evidence-backed release candidate on the working branch.

- [ ] Run format check, lint, typecheck, unit tests, production build, secret scan and
      dependency audit.
- [ ] Run critical browser journeys on desktop and mobile, including navigation,
      catalogue, products, promotions, loyalty, stores and external hand-offs.
- [ ] Compare the implemented first screen against the approved reference and fix all
      P0/P1/P2 design differences; record `design-qa.md` with `final result: passed`.
- [ ] Review final diff for secrets, unrelated changes, generated noise and production
      targets.
- [ ] Commit in reviewable slices and push only the working `agent/*` branch after all
      required local checks pass.

Dependencies: S1–S7.

Release gate: production merge/deployment/DNS requires explicit owner authorization.

## Next safe action

Capture the baseline, then implement S2 without changing public data or production.
