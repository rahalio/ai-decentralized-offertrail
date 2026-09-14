# Codegen guide

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:journeys   # Mode A example — also: offers, consents, fulfilments, incidents, reporting, identity
pnpm codegen:all        # all enabled domains
```

Config: `.codegen/.zero-codegen-merged.json` (local only — **never commit**)  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## OpenAPI domains

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- Product: `journeys`, `offers`, `consents`, `fulfilments`, `incidents`, `reporting`
- Scaffold: `identity.yaml`
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product |
|---------------|---------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Journeys / offers / consents / … |
| Envelope + Problem contracts | Domain-specific schemas |

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
