# Boilerplate Backend

API REST em .NET 9 com arquitetura em camadas (Domain, Application, Infrastructure, Interface).

## Tecnologias

- **.NET 9** – Runtime e SDK
- **ASP.NET Core** – API web
- **Entity Framework Core 9** – ORM (SQL Server e InMemory para desenvolvimento)
- **MediatR** – CQRS (Commands e Queries)
- **FluentValidation** – Validação de comandos
- **Serilog** – Logging estruturado
- **Swagger (OpenAPI)** – Documentação da API
- **Refit** – Cliente HTTP tipado para integrações
- **Polly** – Retry e resiliência em chamadas HTTP
- **FluentMigrator** – Migrations de banco (projeto Migration)

## Estrutura da solução

| Projeto | Descrição |
|---------|-----------|
| **Boilerplate.Domain** | Entidades, interfaces (repositórios, serviços, integrações) |
| **Boilerplate.Application** | Casos de uso (MediatR handlers), validators, DTOs de aplicação |
| **Boilerplate.Infrastructure** | EF Core (DbContext, repositórios, mapeamentos) |
| **Boilerplate.CrossCutting** | DTOs compartilhados, options, helpers |
| **Boilerplate.CrossCutting.IOC** | Registro de dependências (DI) |
| **Boilerplate.Interface** | API (Controllers, Program, configuração) |
| **Boilerplate.Migration** | Console app com FluentMigrator para migrations |
| **Boilerplate.Tests** | Testes unitários (xUnit, NSubstitute, FluentAssertions) |

## Pré-requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- SQL Server (opcional; em desenvolvimento o app usa **InMemory** por padrão via `appsettings.Development.json`)

## Como executar

### API

Na pasta `backend`:

```bash
dotnet run --project Boilerplate.Interface
```

Ou abra a solução no Visual Studio e execute o projeto **Boilerplate.Interface** (perfil padrão: Kestrel em `https://localhost:7196` e `http://localhost:5196`).

- **Swagger**: [https://localhost:7196/swagger](https://localhost:7196/swagger) ou [http://localhost:5196/swagger](http://localhost:5196/swagger)

### Usando SQL Server

1. Ajuste `appsettings.Development.json`: altere `Database:Provider` para `SqlServer` e configure `ConnectionStrings:Default`.
2. Rode a migration (veja abaixo) e depois `dotnet run --project Boilerplate.Interface`.

### Migration do banco

Para aplicar as migrations (criação/atualização das tabelas):

```bash
dotnet run --project Boilerplate.Migration
```

O projeto Migration usa a connection string `Default` do `appsettings.json` (ou variáveis de ambiente). Em desenvolvimento, se estiver com InMemory, a migration não é necessária.

### Testes

```bash
dotnet test Boilerplate.Tests
```

## Configuração

- **appsettings.json** – Configuração base (produção).
- **appsettings.Development.json** – Desenvolvimento (ex.: `Database:Provider: InMemory`, connection string local).

Variáveis de ambiente sobrescrevem as chaves do appsettings (ex.: `ConnectionStrings__Default`).

## Deploy

- **Docker**: use o `Dockerfile` em `Boilerplate.Interface` ou os `Dockerfile.publish` / `Dockerfile.migration-publish` na raiz do backend para imagens de API e migration.
- **Kubernetes**: manifests na pasta `deploy/` (`api.yaml`, `migration.yaml`). Ajuste as imagens e aplique com `kubectl apply -f deploy/`.
