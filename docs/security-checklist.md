# Security checklist (CleanStack)

Use before exposing this starter beyond local development. CleanStack is a **learning / bootstrap** foundation — real auth and production persistence are still on the [roadmap](../README.md#roadmap).

For agent-assisted reviews, install:

```bash
npx skills add luismpenholato/verdic-skills --skill application-security-review
```

## Current MVP caveats

- [ ] Backend JWT auth is **not** fully production-ready yet (see roadmap)
- [ ] Frontend route guards may be stubs — **API must enforce** authorization when auth lands
- [ ] Development may use **InMemory** DB — data does not survive restarts
- [ ] Do not treat Swagger / open CORS as acceptable for internet exposure

## Before any shared or production deploy

### Secrets and config

- [ ] No secrets in git; use environment variables / secret store
- [ ] Rotate any credential that ever appeared in logs, chat, or commits
- [ ] Production connection strings and JWT signing keys are strong and unique

### HTTP and API

- [ ] HTTPS only at the edge
- [ ] CORS origins restricted; credentials only when required
- [ ] Validation on every write endpoint
- [ ] Generic errors to clients; detailed traces only in protected logs

### Dependencies and images

- [ ] `dotnet list package --vulnerable` / `npm audit` reviewed
- [ ] Container runs as non-root when Docker is used
- [ ] No secrets baked into image layers

### Operations

- [ ] Structured logging without tokens/passwords
- [ ] Health endpoints do not leak internal details publicly
- [ ] Backup / restore plan for real databases

## Reporting issues

Follow [SECURITY.md](../SECURITY.md) — private advisory, never public issues for vulnerabilities.
