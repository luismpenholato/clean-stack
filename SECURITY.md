# Security policy

## Supported versions

Security fixes are considered for the main branch (`main`) and the latest published version of this repository.

| Component | Scope |
|------------|--------|
| `backend-dotnet/` | ASP.NET Core API, authentication, endpoints, HTTP integrations |
| `frontend-angular/` | Angular SPA (client-side) |
| `frontend-react/` | Next.js app (client + server routes) |
| Dependencies | NuGet / npm — we prioritize updates via PR or advisory |

> This project is a **boilerplate/template**. Forks and production deployments are the responsibility of those who operate them (secrets, HTTPS, WAF, etc.).

## Reporting a vulnerability

**Do not** open a public issue for security flaws.

Use one of these options:

1. **[GitHub Security Advisories](https://github.com/luismpenholato/Boilerplate/security/advisories/new)** (recommended — private report)
2. Direct contact with the maintainer via an agreed private channel (if applicable)

### What to include in the report

- Clear description of the issue and impact
- Steps to reproduce (PoC if possible)
- Affected component (`backend-dotnet`, `frontend-angular`, `frontend-react`)
- Version/commit or tag
- Mitigation suggestion (optional)

### What **not** to send

- Real credentials, JWT tokens, connection strings, or database dumps
- Third-party personal data

## Response time (target)

| Stage | Target timeline |
|-------|-------------------|
| Receipt confirmation | 3 business days |
| Initial triage | 7 business days |
| Fix or plan | based on severity |

There is no formal SLA; this boilerplate is maintained as an open source project.

## Out of scope for this policy

- Misconfiguration in user deployments (e.g., exposed `.env`, permissive CORS in production)
- Vulnerabilities already fixed in newer upstream dependency versions
- Issues in forks not merged into this repository

## Best practices when using this boilerplate

- Never commit secrets; use environment variables and secret managers
- Enable HTTPS in production
- Keep dependencies up to date (`dotnet list package --outdated`, `npm audit`)
- Implement real authentication/authorization before exposing sensitive data (current MVP uses stubs in parts of the frontend)

We appreciate responsible reports that help keep the foundation safer for everyone.
