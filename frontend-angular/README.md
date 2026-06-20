# CleanStack Frontend (Angular)

**Angular 21** SPA that consumes the REST API from the .NET backend.

## Version status

| Item | Value |
|---|---|
| **Angular** | **21.2.17** (latest patch on the 21 line) |
| **@angular/cli / build** | **21.2.16** |
| **ng-zorro-antd** | **21.3.1** |
| **Angular CDK** | **21.2.14** |
| **TypeScript** | **5.9.x** |
| **RxJS** | **7.8.x** |
| **Vitest** | **4.1.9** |

Angular is **up to date** on major 21. Angular 22 exists on npm (`latest`), but **has not been migrated** (criterion: stable 21 line).

There is no `lint` script in `package.json`.

## Stack

- **Angular 21** — standalone components, signals, OnPush
- **ng-zorro-antd 21** — UI components
- **Angular CDK 21**
- **RxJS 7**
- **TypeScript 5.9**
- **Vitest 4** — tests via `ng test`
- **Prettier** — formatting (via `package.json`)
- **`.editorconfig`** — indentation and charset

## Prerequisites

- [Node.js](https://nodejs.org/) **v24+** (recommended)
- npm (included with Node)

> **Pending:** add `.nvmrc` or `engines` in `package.json`.

## How to run

```bash
npm install
npm start
```

App: http://localhost:3000

## Build

```bash
npm run build
```

Output in `dist/cleanstack-frontend/browser/`.

## Tests

```bash
npm test
```

**14 tests** (Vitest via Angular CLI). Do not use `npm test -- --run` — the runner is `ng test`.

## API configuration

| File | Usage |
|---|---|
| `src/environments/environment.development.ts` | Dev — `apiBaseUrl: 'http://localhost:5000'` |
| `src/environments/environment.ts` | Production |
| `src/environments/environment.test.ts` | Tests |

Run the backend in parallel: https://localhost:5001 or http://localhost:5000.

## Structure

```txt
src/
  app/
    layout/main-layout/     → shell (header, drawer, outlet)
    pages/products/         → example CRUD (list + form + service)
    shared/                 → components, guards, interceptors, …
  styles/                   → design system (_tokens, _ng-zorro-overrides, …)
  environments/
docs/STRUCTURE.md           → detailed documentation
```

### Light/dark theme

- Tokens in `src/styles/_tokens.scss` (`--app-*`)
- ng-zorro overrides in `src/styles/_ng-zorro-overrides.scss`
- Toggle via `LayoutService` → `body.theme-dark` class
- Drawer/menu: `nzWrapClassName="app-drawer"` + CSS `.app-drawer .drawer-menu` (drawer portaled to body)

Details: [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

### SEO (basic)

- `title` + `data.description` in `app.routes.ts`
- `AppTitleStrategy` updates `<title>` and meta tags on navigation
- `index.html` with base Open Graph and `noindex` (admin app)

## MVP routes (Products)

REST API: `/api/products`.

| Screen | UI path |
|------|--------|
| Listing | `products` |
| Create | `products/new` |
| Edit | `products/:id/edit` |

Root redirect: `''` → `products`.

### Conventions

- Reusable components in `shared/components/`
- HTTP services per feature
- Standalone components, signals, OnPush
- Guards in `shared/guards/` (`authGuard` stub in MVP)

## Deploy

```bash
docker build -t cleanstack-frontend:latest .
docker run -p 80:80 cleanstack-frontend:latest
```

Multi-stage: Node build + nginx (`Dockerfile` at project root).

## Complementary skill

```bash
npx skills add luismpenholato/maurao-skills --skill angular-frontend-clean-architecture
```

## Notes

- Build may emit a **budget warning** (~1.65 MB vs 1.50 MB) — does not block the build.
- `authGuard` returns `true` — replace when real authentication exists.
