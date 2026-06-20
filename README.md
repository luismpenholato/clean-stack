# Boilerplate

Fullstack boilerplate with a .NET 10 API backend, Angular frontend, and React 19 + Next.js 16 frontend — ready to serve as a foundation for enterprise, admin, and SaaS projects.

## Purpose

Provide a professional, consistent, and easy-to-understand foundation with:

- REST API in Clean Architecture + CQRS
- Angular SPA with ng-zorro (traditional enterprise admin)
- React 19 + Next.js 16 app with Ant Design (SaaS, modern dashboards, SSR/SEO)

Each frontend is **independent**: choose one or use both depending on the product.

## Projects

| Project | Description | Main stack |
|---|---|---|
| [`backend-dotnet/`](backend-dotnet/) | .NET 10 API with clean architecture | ASP.NET Core, EF Core, MediatR, FluentValidation, FluentMigrator, Refit, Serilog |
| [`frontend-angular/`](frontend-angular/) | Angular 21 SPA | ng-zorro-antd, RxJS, Vitest |
| [`frontend-react/`](frontend-react/) | React 19 + Next.js 16 app | Ant Design, TanStack Query, Axios, React Hook Form, Zod |

## Target versions

| Layer | Version |
|---|---|
| Backend | **.NET 10 LTS** (SDK 10.0.301+) |
| Angular | **21.x** (latest stable patch on the 21 line) |
| Next.js | **16.x + React 19.x** |

## Structure

```txt
Boilerplate/
  backend-dotnet/    → .NET 10 API
  frontend-angular/  → Angular 21 (ng-zorro)
  frontend-react/    → React 19 + Next.js 16 + Ant Design
  README.md
  LICENSE
```

## Quick start

### Backend

```bash
cd backend-dotnet
dotnet restore backend-dotnet.sln
dotnet run --project Boilerplate.Interface
```

Swagger: https://localhost:5001/swagger

### Frontend Angular

```bash
cd frontend-angular
npm install
npm start
```

App: http://localhost:3000

### Frontend React (Next.js)

```bash
cd frontend-react
npm install
cp .env.example .env.local
npm run dev
```

App: http://localhost:3000 (use another port if Angular is already running)

## Key environment variables

### Backend

| Variable / key | Description |
|---|---|
| `ConnectionStrings__Default` | SQL Server connection string |
| `Database:Provider` | `InMemory` (dev) or `SqlServer` |
| `ExternalProductApi__BaseUrl` | External API URL (e.g., FakeStore) |

See [`backend-dotnet/README.md`](backend-dotnet/README.md) for details.

### Frontend Angular

| File | Key |
|---|---|
| `src/environments/environment.development.ts` | `apiBaseUrl` |

### Frontend React

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL (e.g., `http://localhost:5000`) |
| `NEXT_PUBLIC_APP_NAME` | App display name and SEO tags |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (metadata, sitemap, Open Graph) |

## Architecture conventions

### Backend

- **Domain** → entities and interfaces
- **Application** → Commands/Queries (MediatR), validators, vertical slice in `Features/`
- **Infrastructure** → EF Core, repositories
- **Interface** → Controllers, Program, middlewares
- **CrossCutting** → DTOs, options, helpers
- **Migration** → FluentMigrator (SQL schema)
- **Tests** → mirror `Application/Features/` (handlers + validators)

Flow: `Controller → MediatR → Handler → Repository/Service → Database or external API`

Validation: `ValidateAndThrowAsync` in the handler + validator registration by assembly.

### Frontend Angular

- `pages/` per feature (vertical slice)
- `shared/` for reusable components, interceptors, pipes
- Standalone components, signals, OnPush

### Frontend React

- `src/app/` → routes and layouts only
- `src/features/` → domains and screens
- `src/shared/` → libs, providers, generic components, **`shared/theme/`** (design system)

### URLs (UI vs API)

| Layer | Convention | Example |
|---|---|---|
| UI routes (Angular and React) | English | `/products`, `/products/new`, `/products/:id/edit` |
| REST endpoints | English | `/api/products` |

Both frontends use **only** `/products/*` in the UI.

Basic SEO is configured in both (title/description per route, `noindex` for admin app).

## How to choose between Angular and React

| Scenario | Recommendation |
|---|---|
| Enterprise admin, traditional SPA, Angular team | **frontend-angular/** (Angular + ng-zorro) |
| New SaaS, SSR, SEO, App Router, React ecosystem | **frontend-react/** (React 19 + Next.js 16 + Ant Design) |
| Same backend, different products | Use one frontend per product — do not mix patterns |

## Main commands

```bash
# Backend
cd backend-dotnet && dotnet build backend-dotnet.sln && dotnet test backend-dotnet.sln

# Backend formatting (CI)
cd backend-dotnet && dotnet format backend-dotnet.sln --verify-no-changes

# Angular
cd frontend-angular && npm run build && npm test

# React
cd frontend-react && npm run lint && npm run test && npm run build
```

## Skills for AI agents

Complementary skills in [`maurao-skills`](https://github.com/luismpenholato/maurao-skills):

```bash
npx skills add luismpenholato/maurao-skills --skill dotnet-backend-clean-architecture
npx skills add luismpenholato/maurao-skills --skill angular-frontend-clean-architecture
npx skills add luismpenholato/maurao-skills --skill react-nextjs-antd-clean-architecture
```

## Deploy

| Project | Docker |
|---|---|
| API | `backend-dotnet/Boilerplate.Interface/Dockerfile` |
| Migration | `backend-dotnet/Boilerplate.Migration/Dockerfile` |
| Angular | `frontend-angular/Dockerfile` |
| React | `frontend-react/Dockerfile` |

Kubernetes manifests: `backend-dotnet/deploy/`. See each project's README.

## Suggested roadmap

- [ ] Real JWT authentication in the backend (endpoint `/api/auth/login`)
- [ ] Route guard/middleware in `frontend-react`
- [ ] Align API contracts between Angular and React (`Product.Id` long vs string)
- [ ] Decouple Domain from CrossCutting/Refit (architectural refactor)
- [ ] Migration Docker: copy `appsettings` in Release + `AddEnvironmentVariables`
- [ ] Unified CI (backend build + both frontends + `dotnet format --verify-no-changes`)
- [ ] Document minimum Node version in `.nvmrc`

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js v24+](https://nodejs.org/) (Angular); Node 20+ works for Next.js
- Docker (optional)

## License

This project is licensed under the [MIT License](LICENSE).

## Community

| Document | Description |
|-----------|-----------|
| [Contributing](CONTRIBUTING.md) | How to contribute, standards, and PR workflow |
| [Security](SECURITY.md) | Responsible vulnerability reporting |
| [License](LICENSE) | MIT License |
