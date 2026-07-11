# Contributing

Thank you for considering a contribution to **CleanStack**. This document describes the expected workflow for issues, branches, and pull requests.

[Back to root documentation](../README.md)

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Be respectful and constructive. Focus on technical feedback, clarity, and maintainability.

## Before you start

1. Check whether an [issue](https://github.com/luismpenholato/clean-stack/issues) already exists for the topic.
2. For large or structural changes, open an [architecture discussion](.github/ISSUE_TEMPLATE/architecture-discussion.yml) first to align on scope.
3. Read the [README](README.md) and the documentation for the affected subproject (`backend-dotnet/`, `frontend-angular/`, `frontend-react/`).
4. Do **not** mix Angular and React patterns in the same product — each frontend is independent.

## Development environment

### Prerequisites by stack

| Stack | Requirements |
|---|---|
| Backend | .NET SDK **10.0.301+** ([`backend-dotnet/global.json`](backend-dotnet/global.json)) |
| Angular | Node.js **24+** ([`frontend-angular/.nvmrc`](frontend-angular/.nvmrc)) |
| React | Node.js **24+** ([`frontend-react/.nvmrc`](frontend-react/.nvmrc)) |

Use `npm ci` (not `npm install`) when `package-lock.json` is present.

### Backend (.NET)

```bash
cd backend-dotnet
dotnet restore backend-dotnet.sln
dotnet build backend-dotnet.sln --configuration Release
dotnet test backend-dotnet.sln --configuration Release
```

> `dotnet format` is available locally for C# style checks. It is not enforced in CI because line-ending differences between Windows and Linux can cause false failures.

### Frontend Angular

```bash
cd frontend-angular
npm ci
npm run build
npm test
```

There is no `lint` script in `package.json`. Tests run via `ng test` (Vitest through the Angular CLI).

### Frontend React (Next.js)

```bash
cd frontend-react
npm ci
cp .env.example .env.local
npm run lint
npm run test
npm run build
```

> Use `npm run dev` during development. `npm run start` requires `npm run build` first.

## Contribution workflow

1. **Fork** the repository.
2. Create a **branch** from `main`:
   - `feat/short-description`
   - `fix/short-description`
   - `docs/short-description`
3. Make **small, focused** commits.
4. Open a **Pull Request** using the [pull request template](.github/pull_request_template.md).

## Code standards

| Area | Convention |
|------|-----------|
| Backend | Clean Architecture + CQRS; validators in the handler; optional `dotnet format` locally |
| Angular | Standalone, signals, OnPush; feature in `pages/`; see `docs/STRUCTURE.md` |
| React | App Router; logic in `features/`; theme in `shared/theme/`; see `docs/STRUCTURE.md` |
| UI URLs | English (`/products`, …) |
| REST API | English (`/api/products`, …) |
| Documentation | English (README, CONTRIBUTING, skills) |

### What **not** to commit

- `.env`, `.env.local`, secrets, or real connection strings
- `bin/`, `obj/`, `.next/`, `node_modules/`, `dist/` folders
- Changes generated only by local builds when not needed

## Commit messages

Prefer clear messages in the imperative mood:

```txt
feat(products): add status filter to listing
fix(layout): fix drawer menu portaled to body
docs(react): update MVP routes to /products
```

## Pull requests

- Keep scope **minimal** — one topic per PR when possible.
- Ensure relevant builds and tests pass (see [validation commands](README.md#validation-commands)).
- Add **screenshots** for visual or UI changes.
- Update [CHANGELOG.md](CHANGELOG.md) when the change is user-facing or notable.
- Update README / `STRUCTURE.md` / skills in [maurao-skills](https://github.com/luismpenholato/maurao-skills) if project conventions change.
- For architectural changes, describe impact on layers, CQRS flows, and frontend independence.

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug-report.yml) with:

- affected project (backend, Angular, or React);
- steps to reproduce;
- expected vs. actual behavior;
- runtime versions (.NET, Node, browser);
- logs or screenshots (no sensitive data).

For security vulnerabilities, **do not** open a public issue — see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
