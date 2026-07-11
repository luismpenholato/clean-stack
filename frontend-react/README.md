# CleanStack React 19 + Next.js 16

[Back to root documentation](../README.md)

React **19** frontend with **Next.js 16 App Router**, TypeScript, and **Ant Design** — a modern alternative to Angular for admin/SaaS apps.

## Stack

| Technology | Version |
|---|---|
| React | 19.x |
| Next.js | 16.2.x (App Router) |
| TypeScript | 5.x |
| Ant Design | 6.x + `@ant-design/nextjs-registry` |
| TanStack Query | 5.x |
| Axios | 1.x |
| React Hook Form + Zod | 7.x / 4.x |
| Vitest + Testing Library | 4.x |

**No Tailwind** — Ant Design is the sole design system.

## Architecture

```txt
src/
  app/                    → routes, layouts, loading/error/not-found
  features/               → auth, products (vertical slice)
  shared/                 → components, lib, providers, theme/
docs/STRUCTURE.md         → detailed documentation
```

Summary: no business logic in `src/app`; domain in `src/features/`; reusable code in `src/shared/`. Routes, checklist, and details in [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

## Prerequisites

- [Node.js](https://nodejs.org/) **v24+** (see [`.nvmrc`](.nvmrc))
- npm (included with Node)

## How to run

```bash
npm ci
cp .env.example .env.local
npm run dev
```

App: http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=CleanStack
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> After changing `NEXT_PUBLIC_*` variables, **restart** `npm run dev`. In dev, if the variable is unset, the fallback is `http://localhost:5000`.

> **Dev vs production:** use `npm run dev` during development (hot reload). `npm run start` serves the build — run `npm run build` first.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |
| `npm run test:watch` | Vitest watch mode |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |

## How to create a new feature

1. **Types** — `src/features/{name}/types/`
2. **Zod schema** — `src/features/{name}/schemas/`
3. **Service** — `src/features/{name}/services/{name}.service.ts`
4. **TanStack Query hooks** — `src/features/{name}/hooks/`
5. **Components** — `src/features/{name}/components/`
6. **Orchestrator page** — `src/features/{name}/{name}.page.tsx`
7. **Thin route** — `src/app/(private)/{route}/page.tsx`
8. **Tests** — schema or minimal behavior

## How to create a service

```ts
import { apiClient } from '@/shared/lib/api/api-client';

export async function listItems(): Promise<Item[]> {
  return apiClient.get<Item[]>('/api/items');
}
```

## How to create a hook (TanStack Query)

```ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { listItems } from '../services/item.service';

export function useItems() {
  return useQuery({ queryKey: ['items'], queryFn: listItems });
}
```

## How to create a form (React Hook Form + Zod)

```ts
// schemas/item.schema.ts
import { z } from 'zod';
export const itemSchema = z.object({ name: z.string().min(1) });
export type ItemFormValues = z.infer<typeof itemSchema>;
```

In the component: `useForm` + `zodResolver(itemSchema)` + `Controller` with Ant Design components.

## Ant Design

- Registry in root layout: `@ant-design/nextjs-registry`
- Theme and `en_US` locale in `src/shared/providers/antd-provider.tsx`
- Interactive components require `'use client'`
- **Light/dark theme**: palette in `shared/theme/palette.ts` → `--app-*` vars → Ant Design tokens via `var(--app-*)`; inline script in `layout.tsx` prevents flash on first paint
- **Customization**: prefer Ant Design tokens in `antd-config.ts`; global CSS in `shared/theme/styles/antd/` only for what tokens do not cover; feature styles in CSS Modules

Design system details: [`docs/STRUCTURE.md`](docs/STRUCTURE.md#design-system-srcsharedtheme).

## Docker

```bash
docker build -t cleanstack-frontend-react:latest .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://host.docker.internal:5000 cleanstack-frontend-react:latest
```

Available build args: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_NAME`.

## Complementary skill

```bash
npx skills add luismpenholato/maurao-skills --skill react-nextjs-antd-clean-architecture
```

## MVP routes

| Route | Description |
|---|---|
| `/` | redirect → `/products` |
| `/login` | Login (POST `/api/auth/login`) |
| `/dashboard` | Mock dashboard (no menu item) |
| `/products` | CRUD listing |
| `/products/new` | Create product |
| `/products/[id]/edit` | Edit product |

API remains at `/api/products`.

## SEO (basic)

- Metadata centralized in `shared/lib/seo/metadata.ts`
- `title` + `description` + Open Graph per route (`createPageMetadata`)
- `robots.ts` and `sitemap.ts` at the root of `app/`
- Admin app: global `noindex, nofollow` (adjust when public pages exist)
- Production: set `NEXT_PUBLIC_SITE_URL` to the real URL

## Pending items

- Auth guard/middleware on `(private)` routes
- Global interceptor for `401`
- Real auth endpoint in the .NET backend
