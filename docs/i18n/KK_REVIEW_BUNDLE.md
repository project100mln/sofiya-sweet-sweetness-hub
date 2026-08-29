# SOFIYA Kazakh editorial review bundle

Status: `WAITING_FOR_TECHNICAL_PREVIEW_GATE`. It becomes
`READY_FOR_EDITORIAL_REVIEW` when the exact candidate SHA, CI result and isolated
preview URL are supplied in the handoff.

The primary review worksheet is `KK_TRANSLATION_REGISTER.tsv`. It is generated from
the current source with `npm run review:kk:export`; `npm run review:kk:check` fails if
the committed 645-row register is stale. Filter by `section`, `context` or
`review_status`, then record corrections by exact row and URL.

## Review scope

The reviewer must inspect every Kazakh URL in desktop and mobile view, including all visible text, alt text, accessible labels, empty/error states and WhatsApp payloads.

Static route pairs:

| Russian          | Kazakh              |
| ---------------- | ------------------- |
| `/`              | `/kk`               |
| `/about`         | `/kk/about`         |
| `/catalog`       | `/kk/catalog`       |
| `/stores`        | `/kk/stores`        |
| `/promotions`    | `/kk/promotions`    |
| `/cake-preorder` | `/kk/cake-preorder` |
| `/catering`      | `/kk/catering`      |
| `/news`          | `/kk/news`          |
| `/career`        | `/kk/career`        |
| `/contacts`      | `/kk/contacts`      |
| `/privacy`       | `/kk/privacy`       |
| `/terms`         | `/kk/terms`         |

Dynamic samples and full sets:

- All 53 products: `/kk/catalog/{shared-slug}`; translations are registered in `src/i18n/catalog.ts`.
- All 17 stores: `/kk/stores`; official-address drafts are registered in `src/i18n/content.ts`.
- All 3 news items: `/kk/news/{shared-slug}`.
- Both promotions: `/kk/promotions/{shared-slug}`.
- All interface/form copy: shared components and route components use the URL-derived
  typed locale layer in `src/i18n/messages.ts`, `src/i18n/core.ts` and
  `src/i18n/hooks.ts`.
- Cake form options use stable IDs in `src/data/cake-options.ts`; catering options use stable IDs in `src/data/catering-services.ts`.

## Mandatory reviewer journeys

1. Switch `Русский → Қазақша → Русский` on the same page and confirm that path, slug, query and hash remain intact.
2. Search the Kazakh catalogue by a Kazakh product name and description.
3. Review every catalogue name, description and ingredient list without adding or removing ingredients.
4. Review all 17 city/address/landmark combinations against approved 2GIS spelling.
5. Complete all 11 cake-order steps and inspect the decoded Kazakh WhatsApp message.
6. Submit contact, catering and career forms and inspect the Kazakh WhatsApp messages.
7. Review desktop and mobile header/footer, SOFIYA Club, 404, product/news/promotion details, privacy and terms.
8. Record corrections by exact URL/context; do not edit IDs, slugs, prices, contacts or coordinates.

## How to return corrections

1. Copy the relevant TSV row, preserving its `section`, `context` and `id`.
2. Add the approved replacement in a separate `kk_approved` column or correction
   list; do not overwrite business fields.
3. Mark whether the correction applies to one context or every identical Kazakh
   phrase.
4. Complete `KK_EDITORIAL_SIGNOFF.md` only after all 645 rows and the mandatory
   browser journeys have been reviewed. Legal rows remain separately gated by
   `KK_LEGAL_SIGNOFF.md`.

## Candidate identity

- Base SHA: `008ec430b5093571720adda88c934b8f70b6474f`
- Candidate branch: `agent/sofiya-kazakh-language-completion-20260828`
- Candidate SHA: supplied in the final technical handoff and preview deployment
  metadata; reviewer must copy it into the sign-off files.
- Preview URL: supplied only after CI and isolated Vercel Preview are READY.
