# Backend structure (.NET)

This document describes the .NET 10 solution organization, aligned with Clean Architecture and CQRS with MediatR.

## Solution overview

```txt
backend-dotnet/
├── backend-dotnet.sln                     # Main solution (8 projects)
├── global.json                     # Minimum SDK 10.0.301
├── .editorconfig                   # Code standards and analyzers
├── Boilerplate.Interface/          # HTTP API (application entry point)
│   ├── Controllers/
│   ├── Extensions/                 (Swagger, HealthChecks)
│   ├── Middlewares/                (GlobalExceptionMiddleware)
│   ├── Program.cs
│   ├── Dockerfile
│   └── appsettings.*.json
├── Boilerplate.Application/        # Use cases (CQRS)
│   └── Features/
│       └── Products/
│           ├── Commands/
│           │   ├── CreateProduct/   (Command, Handler, Validator)
│           │   ├── UpdateProduct/   (Command, Handler, Validator)
│           │   └── DeleteProduct/   (Command, Handler)
│           └── Queries/
│               ├── GetProductById/  (Query, Handler)
│               ├── ListProducts/    (Query, Handler)
│               └── ListExternalProducts/ (Query, Handler)
├── Boilerplate.Domain/             # Entities and contracts
│   ├── Entities/
│   ├── Interfaces/                 (Entities, Integration, Repositories, Services, UnitOfWork)
│   └── Services/                   (e.g., ExternalProductService)
├── Boilerplate.Infrastructure/     # EF Core persistence
│   ├── Persistence/                (AppDbContext, Map)
│   ├── Repositories/
│   └── UnitOfWork/
├── Boilerplate.CrossCutting/       # DTOs, options, and helpers
│   ├── Dto/Products/
│   ├── Helpers/
│   └── Options/
├── Boilerplate.CrossCutting.IOC/   # Dependency injection
│   └── DependencyInjection/        (ConfigureBindings*)
├── Boilerplate.Migration/          # FluentMigrator console
│   ├── Migrations/
│   ├── Dockerfile
│   └── appsettings.json
├── Boilerplate.Tests/              # Unit tests (mirrors Application)
│   └── Features/Products/          (17 tests — handlers + validators)
├── docs/
│   └── STRUCTURE.md
└── deploy/                         (Kubernetes manifests)
```

> **Database schema:** table changes go in **FluentMigrator** (`Boilerplate.Migration/Migrations/`). EF Core maps entities at runtime (`Persistence/Map/`). Keep both aligned manually.

## Projects and responsibilities

### Boilerplate.Interface

- **Usage:** entry layer (REST API). Controllers receive HTTP and delegate to MediatR.
- **Content:** `Controllers/`, `Program.cs`, `Middlewares/`, `Extensions/`, `appsettings`.
- **Rule:** no business logic; only orchestrates calls and exposes DTOs.

### Boilerplate.Application

- **Usage:** application orchestration and rules (CQRS). One **feature** per folder in `Features/`.
- **Structure per feature (e.g., Products):**
  - **Commands/** — one folder per command: Command, Handler, and Validator (when applicable).
  - **Queries/** — one folder per query: Query and Handler.
- **Validation:** `await _validator.ValidateAndThrowAsync(request, cancellationToken)` at the start of Command handlers.
- **Rule:** handlers use only Domain interfaces (UoW, repositories, services); return CrossCutting DTOs.

### Boilerplate.Domain

- **Usage:** entities and contracts (interfaces).
- **Content:** `Entities/`, `Interfaces/`, `Services/` (domain implementations when appropriate).
- **Rule:** interfaces define what the application needs; persistence lives in Infrastructure.
- **Known debt:** references CrossCutting (DTOs) and Refit (attributes on `IExternalProductIntegration`) — see README.

### Boilerplate.Infrastructure

- **Usage:** persistence with EF Core (SQL Server and InMemory).
- **Content:** `Persistence/` (DbContext, Map), `Repositories/`, `UnitOfWork/`.
- **Rule:** only project with EF Core; implements Domain interfaces.

### Boilerplate.CrossCutting

- **Usage:** shared types and configuration (API DTOs, options, helpers).
- **Content:** `Dto/Products/` (`ProductDto`, `ExternalProductDto`), `Options/` (`ExternalProductApiOptions`), `Helpers/` (`UrlHelper`).

### Boilerplate.CrossCutting.IOC

- **Usage:** dependency registration (DI), called from `Program.cs`.
- **Files:** `ConfigureBindingsOptions`, `ConfigureBindingsDatabaseContext`, `ConfigureBindingsMediatR`, `ConfigureBindingsRepository`, `ConfigureBindingsUnitOfWork`, `ConfigureBindingsServices`, `ConfigureBindingsIntegration` (Refit + Http.Resilience), `ConfigureBindingsValidator`, `ConfigureBindingsHealthChecks`.

### Boilerplate.Migration

- **Usage:** console that runs **FluentMigrator** migrations (SQL Server).
- **Execution:** `dotnet run --project Boilerplate.Migration`
- **Config:** `ConnectionStrings:Default` in `appsettings.json` (Migration project).
- **Rule:** new table/column = new class in `Migrations/` (e.g., `Mig_YYYYMMDDHHMMSS_Name.cs`).

### Boilerplate.Tests

- **Usage:** unit tests. Structure mirrors `Application/Features/`.
- **Current coverage (Products):**
  - **Handlers:** Create, Update, Delete, GetById, List, ListExternal
  - **Validators:** Create, Update
- **Conventions:**
  - Handler: mock UoW/repository/service/validator; test handler logic.
  - Validator: instantiate real validator; test FluentValidation rules.
- Details in [`Boilerplate.Tests/README.md`](../Boilerplate.Tests/README.md).

## Request flow (example: create product)

1. **Interface:** `ProductsController` receives the body and sends `CreateProductCommand` via `IMediator.Send`.
2. **Application:** `CreateProductHandler` validates, optionally imports from external API (Refit), persists via UoW.
3. **Domain:** defines `Product`, `IProductRepository`, `IExternalProductService`, etc.
4. **Infrastructure:** `ProductRepository` + EF Core persist to the database.
5. **CrossCutting:** `ProductDto` in the HTTP response.

## External HTTP integration (Products)

1. **Domain:** `IExternalProductIntegration` (Refit contract) and `IExternalProductService`.
2. **CrossCutting.IOC:** `AddRefitClient<IExternalProductIntegration>()` + `AddStandardResilienceHandler()`.
3. **Application:** `ListExternalProductsHandler` and import in `CreateProductHandler`.

Config: `ExternalProductApi:BaseUrl` (e.g., `https://fakestoreapi.com` in Development).

## Products endpoints (reference)

| Method | Route | Operation |
|--------|------|----------|
| GET | `/api/products` | ListProducts |
| GET | `/api/products/external` | ListExternalProducts |
| GET | `/api/products/{id}` | GetProductById |
| POST | `/api/products` | CreateProduct |
| PUT | `/api/products/{id}` | UpdateProduct |
| DELETE | `/api/products/{id}` | DeleteProduct |

## Summary — when to use each project

| Project | When to use |
|---------|-------------|
| **Interface** | New endpoints = controller or methods; delegate to MediatR. |
| **Application** | New operation = folder in `Features/<Feature>/Commands/` or `Queries/`. |
| **Domain** | New entity = `Entities/` + interfaces in `Interfaces/`. |
| **Infrastructure** | New entity = EF Map, repository, UnitOfWork. |
| **CrossCutting** | New shared DTO or option. |
| **CrossCutting.IOC** | New service/repository/integration = `ConfigureBindings*.cs`. |
| **Migration** | SQL schema change = new FluentMigrator migration. |
| **Tests** | New handler/validator = mirror folder in `Boilerplate.Tests/Features/`. |

Keeping this structure makes it easy to scale with new features without mixing responsibilities across layers.
