# CleanStack Backend

[Back to root documentation](../README.md)

REST API in **.NET 10** with layered architecture (Clean Architecture + CQRS).

## Stack

| Technology | Version / usage |
|---|---|
| **.NET 10 LTS** | Runtime and SDK (`net10.0`) |
| **ASP.NET Core** | Web API |
| **Entity Framework Core 10** | ORM (SQL Server and InMemory) — **10.0.9** |
| **MediatR 14.1** | CQRS (Commands and Queries) |
| **FluentValidation 12** | Validation in handler (`ValidateAndThrowAsync`) |
| **Serilog 4.3 / AspNetCore 10** | Structured logging |
| **Swagger (OpenAPI) 10** | API documentation |
| **Refit 11** | Typed HTTP client (external integration) |
| **Http.Resilience 10** | HTTP retry/resilience (`AddStandardResilienceHandler`) |
| **FluentMigrator 8** | Database migrations (SQL Server) |
| **xUnit + NSubstitute + FluentAssertions** | Unit tests (17 tests) |

> **Microsoft.\* packages:** **10.0.9** (EF Core, Extensions, HealthChecks).  
> **Validation:** FluentValidation in handler + `AddValidatorsFromAssemblyContaining`.  
> **Schema:** FluentMigrator creates tables; EF Core maps entities — keep both aligned.

## Architecture

```txt
Controller (Interface)
    ↓ IMediator.Send
Handler (Application)
    ↓ Repository / UnitOfWork / Services
Infrastructure (EF Core) + HTTP integrations
    ↓
Database / external APIs
```

### Layers

| Project | Responsibility |
|---|---|
| **CleanStack.Domain** | Entities, interfaces (repositories, services, integrations) |
| **CleanStack.Application** | MediatR handlers, validators, features by folder |
| **CleanStack.Infrastructure** | DbContext, repositories, EF mappings |
| **CleanStack.CrossCutting** | DTOs, options, helpers |
| **CleanStack.CrossCutting.IOC** | Dependency registration (DI) |
| **CleanStack.Interface** | Controllers, Program, middlewares, Swagger |
| **CleanStack.Migration** | FluentMigrator console |
| **CleanStack.Tests** | Unit tests |

### Feature structure (Products example)

```txt
Application/Features/Products/
  Commands/CreateProduct/     → Command, Handler, Validator
  Commands/UpdateProduct/     → Command, Handler, Validator
  Commands/DeleteProduct/     → Command, Handler
  Queries/ListProducts/       → Query, Handler
  Queries/GetProductById/     → Query, Handler
  Queries/ListExternalProducts/ → Query, Handler
Interface/Controllers/ProductsController.cs
Infrastructure/Repositories/ProductRepository.cs
CrossCutting/Dto/Products/ProductDto.cs
Migration/Migrations/Mig_*_CreateProducts.cs
Tests/Features/Products/      → mirrors handlers and validators
```

### New feature flow

1. Entity and interfaces in **Domain**
2. DTOs in **CrossCutting**
3. Command/Query + Handler + Validator in **Application**
4. Repository/EF mapping in **Infrastructure**
5. Endpoint in **Controller** (Interface)
6. FluentMigrator migration if needed
7. Tests in **CleanStack.Tests** (handler + validator when applicable)
8. DI registrations in **CrossCutting.IOC**

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) (10.0.301+)
- SQL Server (optional; dev uses **InMemory** by default)

The `global.json` file pins the minimum SDK:

```json
{ "sdk": { "version": "10.0.301", "rollForward": "latestFeature" } }
```

## How to run

### API

```bash
cd backend-dotnet
dotnet restore backend-dotnet.sln
dotnet run --project CleanStack.Interface
```

- Swagger: https://localhost:5001/swagger
- HTTP: http://localhost:5000

### SQL Server

1. In `appsettings.Development.json`: set `Database:Provider` = `SqlServer` and configure `ConnectionStrings:Default`.
2. Run the migration, then the API.

### Database migration

```bash
dotnet run --project CleanStack.Migration
```

Uses `ConnectionStrings:Default` from the Migration project's `appsettings.json`. With **InMemory** provider on the API, migration is not required.

## Tests

```bash
dotnet test backend-dotnet.sln
```

Current coverage: all **Products** handlers and validators (17 tests).

Details in [`CleanStack.Tests/README.md`](CleanStack.Tests/README.md).

## Build and formatting

```bash
dotnet build backend-dotnet.sln
dotnet format backend-dotnet.sln                  # applies .editorconfig
dotnet format backend-dotnet.sln --verify-no-changes   # CI
```

Code standards in [`.editorconfig`](.editorconfig) (naming, file-scoped namespaces, usings, analyzers).

## Configuration

| File / key | Usage |
|---|---|
| `appsettings.json` | Base API configuration |
| `appsettings.Development.json` | Dev (InMemory, FakeStore API) |
| `Database:Provider` | `InMemory` or `SqlServer` |
| `ConnectionStrings:Default` | SQL Server connection string |
| `ExternalProductApi:BaseUrl` | External API base URL (Refit) |

Environment variables override appsettings (e.g., `ConnectionStrings__Default`).

## Deploy

Build from the `backend-dotnet/` root:

```bash
# API
docker build -t cleanstack-api:latest -f CleanStack.Interface/Dockerfile .

# Migration
docker build -t cleanstack-migration:latest -f CleanStack.Migration/Dockerfile .
```

## Known architectural debt

| Severity | Item |
|---|---|
| Critical | Domain references CrossCutting and Refit (dependency inversion) |
| Important | Two schema mechanisms (EF mapping + FluentMigrator) without a single source |
| Important | Migration in Release/Docker: `appsettings.json` only copied in Debug in csproj |
| Improvement | Product→ProductDto mapping duplicated in handlers |

## Additional documentation

- [`docs/STRUCTURE.md`](docs/STRUCTURE.md) — detailed structure, flows, and endpoints
- [`CleanStack.Tests/README.md`](CleanStack.Tests/README.md) — test conventions
