# Contributing

Thank you for considering a contribution to **Boilerplate**. This document describes the expected workflow for issues, branches, and pull requests.

## Code of conduct

Be respectful and constructive. Focus on technical feedback, clarity, and maintainability — no personal attacks.

## Before you start

1. Check whether an [issue](https://github.com/luismpenholato/Boilerplate/issues) already exists for the topic.
2. For large changes, open an issue first to align on scope.
3. Read the [README](README.md) and the documentation for the affected subproject (`backend-dotnet/`, `frontend-angular/`, `frontend-react/`).

## Development environment

### Backend (.NET)

```bash
cd backend-dotnet
dotnet restore backend-dotnet.sln
dotnet build backend-dotnet.sln
dotnet test backend-dotnet.sln
dotnet format backend-dotnet.sln --verify-no-changes
```

### Frontend Angular

```bash
cd frontend-angular
npm install
npm run build
npm test
```

### Frontend React (Next.js)

```bash
cd frontend-react
npm install
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
4. Open a **Pull Request** describing:
   - the problem or goal;
   - what changed;
   - how to test;
   - screenshots (if UI).

## Code standards

| Area | Convention |
|------|-----------|
| Backend | Clean Architecture + CQRS; validators in the handler; `dotnet format` |
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
- Ensure relevant builds and tests pass.
- Update README/`STRUCTURE.md`/skills in [maurao-skills](https://github.com/luismpenholato/maurao-skills) if project conventions change.

## Reporting bugs

Use [Issues](https://github.com/luismpenholato/Boilerplate/issues) with:

- steps to reproduce;
- expected vs. actual behavior;
- version (.NET, Node, browser);
- logs or screenshots (no sensitive data).

For security vulnerabilities, **do not** open a public issue — see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
