# Offertrail

OpenAPI-first DDD monorepo for the Offertrail journey offer studio — lawful data-for-value exchanges under GDPR.

Package scope: **`@offertrail/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  →  Vite + React operator UI (proxies to api-server)
```

Product specs: [PRODUCT.md](PRODUCT.md), [USER_STORIES.md](USER_STORIES.md), [WEBAPP.md](WEBAPP.md).

## Domains (OpenAPI)

One YAML per domain under [`packages/openapi-core/src/`](packages/openapi-core/src/):

| Domain | Spec |
|--------|------|
| identity | `identity.yaml` (scaffold auth / API keys) |
| journeys | `journeys.yaml` |
| offers | `offers.yaml` |
| consents | `consents.yaml` |
| fulfilments | `fulfilments.yaml` |
| incidents | `incidents.yaml` |
| reporting | `reporting.yaml` |

Shared envelopes live in `packages/openapi-core/src/common/`.

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: offertrail_demo_local_dev_key

pnpm dev:web
# UI: http://127.0.0.1:5173
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=offertrail-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

Product domains currently use an **in-memory sandbox** adapter store for local demos (no Dynamo required for `/v1` journeys/offers/…).

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.
4. **`.codegen/` must never be committed or pushed** — see `.gitignore` and `.cursor/rules/codegen-no-commit.mdc`. Obtain the tool by copying from `zero-apps-codegen-scaffold`, then run `pnpm codegen:paths`.

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm lint:openapi` / `bundle:openapi` | Redocly lint + bundle all domains |
| `pnpm codegen:paths` | Rewrite absolute paths in `.codegen` config |
| `pnpm codegen:core` | Regenerate core for all domains |
| `pnpm codegen:<domain>` | Mode A generate one domain |
| `pnpm codegen:all` | Mode A generate all domains |
| `pnpm build` | core → services → adapters → api-server |
| `pnpm dev:api` | Fastify API on `:4000` |
| `pnpm dev:web` | Vite webapp on `:5173` |
