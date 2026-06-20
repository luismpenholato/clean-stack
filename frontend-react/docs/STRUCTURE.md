# React 19 + Next.js 16 project structure

**Feature-based (vertical slice) + shared** organization, aligned with Next.js 16 App Router, Ant Design, and TanStack Query.

## Overview

```txt
frontend-react/
├── src/
│   ├── app/                            # Next.js routes (no business logic)
│   │   ├── layout.tsx                  # Root: AntdRegistry + AppProviders + metadata
│   │   ├── page.tsx                    # redirect → /products
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── (public)/
│   │   │   └── login/page.tsx          # Thin route → LoginForm
│   │   └── (private)/
│   │       ├── layout.tsx              # Authenticated shell (AppLayout)
│   │       ├── dashboard/page.tsx
│   │       └── products/
│   │           ├── page.tsx            # → ProductsPage
│   │           ├── new/page.tsx        # → ProductCreatePage
│   │           └── [id]/edit/page.tsx # → ProductEditPage
│   ├── features/                       # Domains / screens
│   │   ├── auth/
│   │   │   ├── components/login-form.tsx
│   │   │   ├── schemas/login.schema.ts
│   │   │   ├── services/auth.service.ts
│   │   │   └── types/auth.ts
│   │   └── products/
│   │       ├── components/             # product-table, product-form
│   │       ├── hooks/                  # use-products, use-create-product, …
│   │       ├── schemas/
│   │       │   ├── product.schema.ts
│   │       │   └── product.schema.test.ts
│   │       ├── services/product.service.ts
│   │       ├── types/product.ts
│   │       ├── products.page.tsx
│   │       ├── product-create.page.tsx
│   │       └── product-edit.page.tsx
│   └── shared/
│       ├── components/                 # app-layout, page-header, result-error
│       ├── lib/
│       │   ├── api/                    # api-client, api-error
│       │   ├── auth/                   # auth-token (localStorage MVP)
│       │   └── env/                    # single entry point for process.env
│       ├── providers/                  # antd-provider, query-provider, app-providers
│       └── theme/                      # design system (TS + CSS)
│           ├── context.tsx             # ThemeProvider, useTheme
│           ├── palette.ts              # light/dark colors
│           ├── antd-config.ts          # ConfigProvider tokens
│           └── styles/                 # CSS only
│               ├── globals.css
│               ├── tokens.css
│               └── antd/
├── docs/STRUCTURE.md
├── public/                             # Static assets
├── Dockerfile                          # Multi-stage Node (build + start)
├── .env.example
├── vitest.config.ts
├── vitest.setup.ts
└── package.json
```

## Current routes (MVP)

| Route | File in `app/` | Feature | Auth |
|------|-------------------|---------|------|
| `/` | `page.tsx` | redirect → `/products` | — |
| `/login` | `(public)/login/page.tsx` | `LoginForm` | public |
| `/dashboard` | `(private)/dashboard/page.tsx` | mock dashboard | **no guard** |
| `/products` | `(private)/products/page.tsx` | `ProductsPage` | **no guard** |
| `/products/new` | `(private)/products/new/page.tsx` | `ProductCreatePage` | **no guard** |
| `/products/[id]/edit` | `(private)/products/[id]/edit/page.tsx` | `ProductEditPage` | **no guard** |

> REST API at `/api/products`.  
> `(private)` routes use layout with header + drawer, but **no middleware/guard** yet.

## Conventions

### `src/app/` — routing layer

- Contains **only** what Next.js requires: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Each `page.tsx` is **thin**: imports and renders the feature page (or a minimal component).
- **No** HTTP calls, **no** complex forms, **no** direct TanStack Query here.
- Route groups `(public)` and `(private)` organize layouts without affecting the URL.

Thin route example:

```tsx
import { ProductsPage } from '@/features/products/products.page';
import { createPageMetadata } from '@/shared/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Products',
  description: 'Manage your product catalog.',
});

export default function Page() {
  return <ProductsPage />;
}
```

### `src/features/{domain}/` — vertical slice

One folder per business domain. Typical structure:

| Subfolder / file | Responsibility |
|--------------------|------------------|
| `types/` | Domain interfaces and types |
| `schemas/` | Zod validation (+ `{schema}.test.ts`) |
| `services/` | Pure async functions calling the API |
| `hooks/` | TanStack Query (`useQuery`, `useMutation`) |
| `components/` | Domain-specific UI |
| `{domain}.page.tsx` | Orchestrates hooks + components for the screen |

Rules:

- Services **must not** use hooks or JSX.
- Hooks **must not** return JSX.
- Visual components **must not** call Axios directly — use hooks or receive data via props.
- Orchestrator pages (`*.page.tsx`) use `'use client'` when using interactive Ant Design, router, or state.

### `src/shared/` — reusable code without domain

| Subfolder | Usage |
|----------|-----|
| `components/` | Layout shell, page-header, result-error |
| `lib/api/` | Central HTTP client (`api-client.ts`), error normalization |
| `lib/auth/` | Token in `localStorage` (MVP) |
| `lib/env/` | **Only** place that reads `process.env` |
| `lib/seo/` | SEO metadata (`createPageMetadata`, `rootMetadata`) |
| `providers/` | Ant Design (`ConfigProvider` en_US), TanStack Query, composition |
| `theme/` | Design system: theme logic (`.ts`) + CSS in `theme/styles/` |

Rule: used in **one** feature → can stay in `features/`; used in **several** → `shared/`.

### Design system (`src/shared/theme/`)

```txt
theme/
  constants.ts           → localStorage keys, helpers
  context.tsx            → ThemeProvider + useTheme
  palette.ts             → single source of colors (light/dark)
  apply-tokens.ts        → injects --app-* on :root
  css-vars.ts            → bridge var(--app-*) → Ant Design tokens
  init-script.ts         → inline anti-flash script (layout.tsx)
  antd-config.ts         → ConfigProvider + cssVar key "app"
  styles/                → CSS only
    globals.css          → reset + imports
    tokens.css           → structural --app-* vars (+ light fallback)
    antd/
      index.css          → aggregates overrides per component
      …
```

Style rules:

1. **Colors** → change only in `palette.ts`
2. **Structural tokens** (spacing, radius, z-index) → `styles/tokens.css`
3. **Ant Design tokens** → `antd-config.ts` with hex from `palette.ts` (Ant Design computes derivatives); custom CSS uses `var(--app-*)`
4. **Global `.ant-*` overrides** → one file per component in `styles/antd/` (only what tokens do not cover)
5. **Feature styles** → CSS Module in the feature, not in `theme/styles/antd/`
6. **Customization order**: Ant Design token → CSS override → feature CSS Module
7. **No** Tailwind, styled-components, or emotion
8. **`theme/styles/`** → `.css` only; TypeScript logic stays at the root of `theme/`

#### Drawer and menu (portal)

Ant Design `Drawer` renders on `body` (portal). Side menu styles **cannot** rely only on the layout CSS Module.

| Piece | Pattern |
|------|--------|
| `Drawer` | `rootClassName="app-drawer"` |
| `Menu` | `className="drawer-menu …"` |
| CSS | selectors `.app-drawer .drawer-menu …` in `styles/antd/menu.css` |
| Spacing between actions | `gap` on parent container (`PageHeader`), not margin on Ant Design props |

Angular parity: `nzWrapClassName="app-drawer"` + overrides in `_ng-zorro-overrides.scss`.

#### Light/dark theme

| Piece | Role |
|------|--------|
| `init-script.ts` | Sync script in `layout.tsx` — reads `localStorage` and applies `--app-*` before hydration (anti-flash) |
| `context.tsx` | `useLayoutEffect` syncs React state + `body.theme-dark` class |
| `cssVar.key: 'app'` | Ant Design theme ID (hash isolation). **Not** the `--app-*` product var prefix |
| `cssVar.prefix` (default `ant`) | Prefix for Ant Design generated vars (`--ant-color-primary`, etc.) — keep default |

#### Customization hierarchy

```
palette.ts  →  --app-* (CSS)  →  Ant Design token (var(--app-*))  →  styles/antd/*.css  →  *.module.css
```

### Environment variables

- `.env.local` (dev) from `.env.example`.
- Access via `src/shared/lib/env/env.ts`:
- In **development**, if `NEXT_PUBLIC_API_BASE_URL` is unset, fallback is `http://localhost:5000`.
- In **production**, the variable is required (build/deploy).

```ts
export const env = {
  apiBaseUrl: getApiBaseUrl(), // dev fallback: http://localhost:5000
  appName: process.env.NEXT_PUBLIC_APP_NAME?.trim() ?? 'CleanStack',
};
```

`NEXT_PUBLIC_*` variables:

| Variable | Description |
|----------|-----------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL |
| `NEXT_PUBLIC_APP_NAME` | App name (SEO and UI) |
| `NEXT_PUBLIC_SITE_URL` | Public URL (metadata, sitemap, Open Graph) |

- Services build paths relative to `baseURL`: `apiClient.get('/api/products')`.

### SEO (basic)

| Piece | Role |
|------|--------|
| `shared/lib/seo/metadata.ts` | `rootMetadata`, `createPageMetadata`, `siteUrl` |
| `app/layout.tsx` | Global metadata (title template, Open Graph, `noindex`) |
| Routes `app/**/page.tsx` | `export const metadata` or `generateMetadata` |
| `app/robots.ts` | Crawler rules |
| `app/sitemap.ts` | Public URLs (minimal in admin MVP) |

Set `NEXT_PUBLIC_SITE_URL` for production. Admin app uses `noindex` until public content exists.

### Server vs Client Components

| `'use client'` | Server Component |
|----------------|------------------|
| Interactive Ant Design | Route that only re-exports feature page |
| `useRouter`, `useState`, `useEffect` | `redirect()`, `metadata` |
| TanStack Query, React Hook Form | Layout without interactivity |
| `localStorage`, user events | — |

### Forms

- Zod schema in `schemas/`.
- Component: `useForm` + `zodResolver` + `Controller` + `Form.Item` (Ant Design).

### Tests

- Vitest + Testing Library.
- Prefer schema tests (`*.schema.test.ts`) and service contracts.
- Do not test Ant Design internal implementation.

## New feature — checklist

1. `types/` — TypeScript models
2. `schemas/` — Zod (+ minimal test)
3. `services/` — async functions with `apiClient`
4. `hooks/` — TanStack Query
5. `components/` — domain UI
6. `{feature}.page.tsx` — screen orchestration
7. Thin route in `src/app/(private)/{route}/page.tsx` (e.g., `/orders`)

## Summary

| Folder | When to use |
|-------|-------------|
| `src/app/` | Routes, layouts, and Next.js special files |
| `src/features/{domain}/` | New feature = new folder with types, schemas, services, hooks, components, page |
| `src/shared/components/` | Reusable generic UI |
| `src/shared/lib/` | API, auth, env, seo — cross-cutting infrastructure |
| `src/shared/providers/` | Global context providers |
| `src/shared/theme/` | Design system (palette, CSS tokens, Ant Design overrides) |

## Known pending items

- Middleware or guard on `(private)` routes
- Global interceptor for `401` (redirect to login)
- Real auth endpoint in the .NET backend
- `.editorconfig` (parity with `frontend-angular`)

## Complementary skill

For AI agents and detailed code patterns, use the `react-nextjs-antd-clean-architecture` skill from the `maurao-skills` repository.
