# SOFIYA — Public Site v1

## Product goal

Public, mobile-first brand website for SOFIYA. It presents the catalogue,
locations, promotions and brand content, then hands qualified enquiries to the
existing WhatsApp, telephone, Instagram and map channels.

This release is a corporate website and catalogue. It is not an e-commerce
checkout.

## In scope

- Brand home page and navigation
- Static catalogue, filtering and product detail pages
- Locations, maps, phones and branch-specific WhatsApp links
- Promotions read from Supabase
- Cake preorder, catering, contact and career WhatsApp hand-offs
- News and legal pages
- Instagram and configurable TikTok links
- Responsive design, accessibility, SEO, performance and error states
- Automated tests, CI, preview deployment and browser UAT

## Deferred to phase 2

- Cart, checkout, delivery and online payments
- Customer accounts and mobile app
- iiko and 1C synchronization
- CRM, staff administration and catalogue CMS

The public data and integration boundaries must stay centralized so phase 2 can
replace static sources without redesigning the user-facing routes.

## Architecture

- TanStack Start / React provides SSR and file-based routes.
- `src/config` owns brand, contact, social and canonical-site configuration.
- `src/data` is the phase-1 source of catalogue, news and location data.
- Supabase is read-only for public active promotions; no public write flows.
- WhatsApp is an external hand-off. The site must never claim that WhatsApp
  accepted or delivered a message.
- Public assets must build and serve independently of Lovable-specific routes.

## Design rules

- Preserve the established purple SOFIYA identity, logo, editorial photography,
  rounded cards and serif/display hierarchy.
- Improve rhythm, responsiveness, focus states and motion incrementally.
- Prefer subtle motion and support `prefers-reduced-motion`.
- Use the existing component language before introducing new patterns.
- Never hide essential information behind hover-only interactions.

## Definition of done

- Formatting, lint, typecheck, unit tests, production build, dependency audit and
  secret scan pass.
- Critical public journeys pass desktop and mobile browser UAT without console or
  broken-link errors.
- Every published route has correct metadata and graceful error/empty states.
- Social, phone, map and WhatsApp actions use verified centralized data.
- Preview is deployed and verified. Production domain/DNS changes remain an owner
  gate.

## Release flow

1. Work on an `agent/*` branch with incremental commits.
2. Run local quality gates and browser UAT.
3. Open a Draft PR and verify its deployment preview.
4. Resolve all P0/P1 findings.
5. Ask the owner only for missing verified business URLs or production-domain
   access that cannot be inferred safely.
