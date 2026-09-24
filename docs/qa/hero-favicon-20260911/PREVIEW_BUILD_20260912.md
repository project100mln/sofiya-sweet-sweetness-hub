# Preview build connection — 2026-09-12

The user connected the existing `sofiya-bakery-preview` Worker to this repository through Cloudflare Workers Builds. Dashboard screenshots confirm the saved configuration below.

- Repository: `project100mln/sofiya-sweet-sweetness-hub`
- Build branch: `agent/sofiya-hero-favicon-20260911`
- Builds for other branches: disabled
- Build command: `npm ci && npm run build:cloudflare`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc --env=""`
- Root directory: `/`
- Build variable: `SKIP_DEPENDENCY_INSTALL=true`
- Build cache: disabled

The dashboard reports that the first build requires a new commit. This documentation-only commit starts that preview build. Application code and assets remain identical to candidate `0db9191dc24b9e8dbe6ffa23b012632baeb1a676`.

The base Wrangler configuration targets `sofiya-bakery-preview` with no custom domain routes. The separate `production` environment is not selected. Main remains at `95797652c06e8c1dc14e0a57498084f3c0342649`; PR #7 remains a draft and unmerged.

Build completion, preview deployment, and candidate visual acceptance are pending. A successful connection alone does not establish any of those outcomes.
