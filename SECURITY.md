# Security policy

## Supported versions

Security fixes are considered for the **`main` branch** and the latest published state of this repository.

| Component | Scope |
|------------|--------|
| `backend-dotnet/` | ASP.NET Core API, authentication, endpoints, HTTP integrations |
| `frontend-angular/` | Angular SPA (client-side) |
| `frontend-react/` | Next.js app (client + server routes) |
| Dependencies | NuGet / npm — updates via PR or advisory |

Older tags, forks, or deployments may not receive backported fixes. This project is a **starter / reference**; production deployments are the responsibility of those who operate them (secrets, HTTPS, WAF, auth, etc.).

## Known starter limitations

CleanStack intentionally ships incomplete production security controls while the [roadmap](README.md#roadmap) catches up:

- Real JWT authentication and React route protection are still planned
- Development often uses an in-memory database
- Some frontend guards are stubs — **do not** expose sensitive APIs publicly until auth is real

See [docs/security-checklist.md](docs/security-checklist.md) before any shared deployment.

## Reporting a vulnerability

**Do not** open a public issue for security flaws.

Use one of these options:

1. **[GitHub Security Advisories](https://github.com/luismpenholato/clean-stack/security/advisories/new)** (recommended — private report)
2. Contact the maintainer through [their GitHub profile](https://github.com/luismpenholato) using a private channel

### What to include in the report

- Clear description of the issue and impact
- Steps to reproduce (PoC if possible)
- Affected component (`backend-dotnet`, `frontend-angular`, `frontend-react`)
- Version/commit or tag
- Mitigation suggestion (optional)

### What **not** to send

- Real credentials, JWT tokens, connection strings, or database dumps
- Third-party personal data

## Response

Reports are reviewed as capacity allows. There is **no formal SLA** — CleanStack is maintained as an open source project alongside other work.

## Out of scope for this policy

- Misconfiguration in user deployments (e.g., exposed `.env`, permissive CORS in production)
- Vulnerabilities already fixed in newer upstream dependency versions
- Issues in forks not merged into this repository

## Best practices when using CleanStack

- Never commit secrets; use environment variables and secret managers
- Enable HTTPS in production
- Keep dependencies up to date (`dotnet list package --outdated`, `npm audit`)
- Implement real authentication/authorization before exposing sensitive data
- Use [`verdic-skills` `application-security-review`](https://github.com/luismpenholato/verdic-skills/tree/main/skills/application-security-review) for structured reviews

We appreciate responsible reports that help keep the foundation safer for everyone.
