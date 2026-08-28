# SOFIYA bilingual release-readiness gate

Gate mode: production release.

## Verdict: NOT READY

The bilingual implementation may move to an isolated review preview only after the
technical candidate passes local checks, both CI jobs and independent technical
recheck. Production remains blocked until a qualified Kazakh editor and an
authorized legal reviewer sign the exact candidate, followed by a separate owner
authorization to merge and deploy.

This verdict supersedes the historical single-language release record. No earlier
preview, pull request or production decision authorizes this bilingual release.

## Evidence matrix

| Gate                     | Current evidence                                                                                                                                         | Owner                                 | Result                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Scope and invariants     | Base `008ec430b5093571720adda88c934b8f70b6474f`; all Russian paths/business identifiers preserved by unit tests                                          | Codex                                 | Local PASS; final SHA pending                 |
| Translation coverage     | Typed UI registry plus reproducible 633-row `docs/i18n/KK_TRANSLATION_REGISTER.tsv`; 53 products, 9 categories, 17 stores, 3 news items and 2 promotions | Codex                                 | Implemented; human wording review pending     |
| SSR/SEO/sitemap          | Self-starting verifier checks 70 RU + 70 KK pages, exact canonicals/hreflang, 420 sitemap alternates, JSON-LD and localized 404s                         | Codex                                 | Local PASS; candidate/preview recheck pending |
| Browser regression       | Desktop/mobile suite covers route rendering, language switch, catalogue, stores, details, forms, 11-step cake flow, focus and responsive overflow        | CI                                    | Pending on exact candidate SHA                |
| Independent technical QA | Initial read-only audit completed; findings were routed into implementation and tests                                                                    | Independent QA                        | Recheck pending on exact candidate SHA        |
| Dependency/security      | Production dependency audit reports 0 vulnerabilities; secret scan and diff whitespace check pass                                                        | Codex/CI                              | Local PASS; CI pending                        |
| Kazakh editorial         | `docs/i18n/KK_EDITORIAL_SIGNOFF.md`                                                                                                                      | Qualified independent Kazakh editor   | `WAITING_FOR_KK_EDITORIAL_SIGNOFF`            |
| Kazakh legal             | `docs/i18n/KK_LEGAL_SIGNOFF.md`                                                                                                                          | Lawyer or explicitly authorized owner | `WAITING_FOR_KK_LEGAL_SIGNOFF`                |
| Production authorization | Explicit merge/deploy instruction after all prior gates pass                                                                                             | Project owner                         | Not granted                                   |

## Candidate boundary

- Repository: `project100mln/sofiya-sweet-sweetness-hub`
- Base SHA: `008ec430b5093571720adda88c934b8f70b6474f`
- Candidate branch: `agent/sofiya-kazakh-language-completion-20260828`
- Allowed deployment target: isolated Vercel Preview only
- Prohibited until separate approval: `main`, production deployment, production DNS,
  database/schema changes and production configuration writes

## Required state transition

1. Local quality gate PASS on the candidate.
2. Independent technical recheck PASS on the exact commit.
3. Draft pull request and both GitHub Actions jobs PASS.
4. Vercel Preview READY and browser verification PASS.
5. Kazakh editorial sign-off PASS and corrections, if any, revalidated.
6. Kazakh legal sign-off PASS on `/kk/privacy`, `/kk/terms` and form notices.
7. Owner gives a new explicit production authorization.

Until steps 1–4 pass, the review-preview gate is `NOT READY`. Even after steps 1–4,
the production verdict remains `NOT READY` while steps 5–7 are open.
