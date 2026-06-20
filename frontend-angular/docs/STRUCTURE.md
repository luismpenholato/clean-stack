# Angular project structure

**Feature-based + shared** organization, aligned with vertical slice (Angular 21, standalone, signals, ng-zorro).

## Overview

```txt
frontend-angular/
├── src/
│   ├── app/
│   │   ├── layout/
│   │   │   └── main-layout/          # Shell (header, drawer, router-outlet)
│   │   ├── pages/
│   │   │   └── products/
│   │   │       ├── product.model.ts
│   │   │       ├── product.service.ts
│   │   │       ├── product.service.spec.ts
│   │   │       ├── product-form/       # Create/edit
│   │   │       │   ├── product-form.component.*
│   │   │       │   └── product-form.helper.ts
│   │   │       └── products-list/      # Listing + spec
│   │   ├── shared/
│   │   │   ├── components/             # page-header, loading, loading-overlay, splash-screen
│   │   │   ├── directives/             # autofocus, currency-mask
│   │   │   ├── guards/                 # auth.guard (MVP stub)
│   │   │   ├── interceptors/           # http-error.interceptor
│   │   │   ├── pipes/                  # truncate
│   │   │   ├── services/               # loading, layout, confirmation, app-title.strategy
│   │   │   └── utils/                  # http-error.util
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── styles/                       # Design system (tokens + ng-zorro overrides)
│   │   ├── _tokens.scss
│   │   ├── _ant-theme.scss
│   │   ├── _base.scss
│   │   └── _ng-zorro-overrides.scss
│   └── environments/                 # apiBaseUrl per environment
│       ├── environment.ts
│       ├── environment.development.ts
│       └── environment.test.ts
├── docs/STRUCTURE.md
├── Dockerfile                          # Multi-stage (Node build + nginx)
├── .editorconfig
└── package.json
```

## Current routes (Products)

REST API: `/api/products`.

| UI path | Component | Guard | SEO title |
|------|------------|-------|---------------|
| `''` | redirect → `products` | — | — |
| `products` | `ProductsListComponent` | `authGuard` | Products |
| `products/new` | `ProductFormComponent` | `authGuard` | New product |
| `products/:id/edit` | `ProductFormComponent` | `authGuard` | Edit product |

> `authGuard` is a **stub** (`() => true`) — placeholder for real auth.  
> Side menu: **Products** item → `/products`. REST API: `/api/products`.

### `layout/main-layout`

- Sticky header + side drawer (`nz-drawer`).
- Drawer uses `nzWrapClassName="app-drawer"` and content in `*nzDrawerContent`.
- Menu: `ul.drawer-menu` with item `routerLink="/products"`.

### Design system (`src/styles/`)

| File | Role |
|---------|--------|
| `_tokens.scss` | `--app-*` variables (light/dark via `body.theme-dark`) |
| `_ant-theme.scss` | `--ant-*` tokens derived from palette |
| `_base.scss` | Reset and global styles |
| `_ng-zorro-overrides.scss` | Per-component overrides (drawer, menu, table, …) |

#### Drawer and menu (portal)

`nz-drawer` renders on `body`. Menu styles **cannot** use selector `.app-main-layout .drawer-menu` — the drawer is outside the host.

| Piece | Pattern |
|------|--------|
| Drawer | `nzWrapClassName="app-drawer"` |
| Content | `*nzDrawerContent` |
| Menu | `class="drawer-menu"`, `nzMode="inline"` |
| CSS | `.app-drawer .drawer-menu …` in `_ng-zorro-overrides.scss` |

Light/dark theme: `LayoutService` toggles `body.theme-dark` class and persists in `localStorage`.

### SEO (basic)

| Piece | Role |
|------|--------|
| `src/index.html` | Meta description, base Open Graph, `noindex` |
| `app.routes.ts` | `title` and `data.description` per route |
| `shared/services/app-title.strategy.ts` | `TitleStrategy` — updates `<title>`, description, and og:* |

Admin app: `noindex, nofollow` in `index.html`. Adjust when a public landing exists.

## Conventions

### `pages/`

- One folder per **feature/domain** (`products/`, future `orders/`).
- Inside the feature: `*.model.ts`, `*.service.ts`, one subfolder per **screen** (`products-list/`, `product-form/`).
- Screen-local helpers (e.g., `product-form.helper.ts`) stay in the screen or feature folder.
- Tests: `*.spec.ts` next to the tested file.

### `shared/`

| Subfolder | Usage |
|----------|-----|
| `components/` | Reusable UI (page-header, loading, loading-overlay, splash-screen) |
| `directives/` | Reusable behavior (autofocus, currency-mask) |
| `guards/` | Route protection (`CanActivateFn`) |
| `interceptors/` | Global HTTP (errors, future token) |
| `pipes/` | Template transformations |
| `services/` | Global state/utility (loading, layout, confirmation) |
| `utils/` | Pure functions (API error parser) |

Rule: used in **one** feature → can stay in `pages/`; used in **several** → `shared/`.

### `environments/`

- `src/environments/environment*.ts` — `apiBaseUrl` and flags per environment.
- Services build URL: `` `${environment.apiBaseUrl}/api/<resource>` ``.

## Summary

| Folder | When to use |
|-------|-------------|
| `layout/` | Shell and route outlet |
| `pages/` | New feature = new folder with model, service, and screens |
| `shared/components/` | Reusable generic UI |
| `shared/directives/` | Reusable directives |
| `shared/guards/` | Auth and route authorization |
| `shared/interceptors/` | Global HTTP interceptors |
| `shared/pipes/` | Reusable pipes |
| `shared/services/` | Global app services (loading, layout, SEO) |
| `shared/utils/` | Pure helpers |
| `environments/` | Per-environment configuration |

Keeping this structure makes it easy to scale with new features without mixing domain and shared code.
