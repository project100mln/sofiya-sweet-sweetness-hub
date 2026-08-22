# SOFIYA — acceptance tests

## Header and hero

- **AT-01** Desktop header displays the approved combined SOFIYA logo, navigation,
  published phone and WhatsApp action without overlap at 1440 px.
- **AT-02** Mobile menu opens above page content, exposes every primary route, closes
  by button/Escape/navigation and restores page scrolling.
- **AT-03** Home hero at 1440 px matches the approved composition: rounded full-width
  image stage, left editorial copy, product-dominant right side, gold CTA, arrows and
  progress indicators.
- **AT-04** Both approved logo appearances remain: the header lockup and the edible
  SOFIYA mark visible in the hero cake photograph.
- **AT-05** Hero CTA, arrow controls and indicators work with keyboard and pointer;
  automatic rotation pauses appropriately and reduced motion is respected.
- **AT-06** Hero has no horizontal overflow and keeps readable copy/CTA at 390 px.

## Design system and public routes

- **AT-07** Every public route uses the shared premium page heading, spacing, card,
  button, focus and color system without broken layouts.
- **AT-08** Purple remains a brand accent and text contrast meets WCAG AA for normal
  text on key surfaces.
- **AT-09** All visible interactive controls have hover, focus and active feedback;
  essential information is not hover-only.

## Catalogue and products

- **AT-10** Catalogue search, category, tags, sort and reset behavior produce correct
  visible results and a usable empty state.
- **AT-11** Every product card opens the correct product detail route and exposes a
  real product image, name and price state.
- **AT-12** Product image motion is subtle, does not shift layout and is disabled or
  simplified under reduced motion.

## Promotions, news and loyalty

- **AT-13** Approved promotion cards open their correct detail pages and preserve
  hours, participating products and WhatsApp clarification actions.
- **AT-14** Home news cards route to loyalty, cake preorder and stores as configured.
- **AT-15** SOFIYA Club animates cups 1–6 automatically at 0.5-second steps, highlights
  cup 6 for one second, can replay and has a reduced-motion presentation.

## Stores and contacts

- **AT-16** Store city filters and address search return counts derived from the current
  store data, with no clipped city labels at 390 px.
- **AT-17** Removed/incorrect addresses do not reappear; approved address corrections
  remain in the rendered store list.
- **AT-18** Every published store offers a usable directions action when a verified map
  URL exists; the page does not show an unfinished "map coming soon" placeholder.
- **AT-19** Phone, WhatsApp, Instagram and map actions use centralized verified data.

## Quality, accessibility and release evidence

- **AT-20** `npm run check` passes.
- **AT-21** `npm audit --omit=dev` reports no known production dependency
  vulnerabilities, or every exception is explicitly classified.
- **AT-22** Critical desktop and mobile browser journeys pass with no application
  console errors or broken first-party assets.
- **AT-23** Keyboard navigation, visible focus, dialog/menu semantics, form labels and
  reduced-motion behavior pass browser UAT.
- **AT-24** `design-qa.md` cites the approved source and browser-rendered implementation,
  contains iteration evidence and ends with exactly `final result: passed`.
- **AT-25** Production remains untouched; the final candidate is limited to the
  authorized `agent/*` branch until the owner separately approves release.
