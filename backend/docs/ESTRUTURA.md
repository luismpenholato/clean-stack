# Estrutura do backend (.NET)

Este documento descreve a organização da solução .NET, alinhada a Clean Architecture e CQRS com MediatR.

## Visão geral da solução

```
backend/
├── Boilerplate.Interface/          # API HTTP (entrada da aplicação)
│   ├── Controllers/
│   ├── Extensions/
│   ├── Program.cs
│   └── appsettings.*.json
├── Boilerplate.Application/        # Casos de uso (CQRS: commands, queries, handlers)
│   └── Features/
│       └── Products/
│           ├── Commands/
│           │   ├── CreateProduct/   (Command, Handler, Validator)
│           │   ├── DeleteProduct/  (Command, Handler)
│           │   └── UpdateProduct/   (Command, Handler, Validator)
│           └── Queries/
│               ├── GetProductById/ (Query, Handler)
│               └── ListProducts/   (Query, Handler)
├── Boilerplate.Domain/             # Entidades e contratos (sem dependências externas)
│   ├── Entities/
│   ├── Interfaces/                 (Entities, Integration, Repositories, Services, UnitOfWork)
│   └── Services/                   (implementações em domínio, ex.: ExternalProductService)
├── Boilerplate.Infrastructure/    # Implementações de persistência e repositórios
│   ├── Persistence/                (AppDbContext, Map)
│   ├── Repositories/
│   └── UnitOfWork/
├── Boilerplate.CrossCutting/       # DTOs, opções e helpers compartilhados
│   ├── Dto/Products/
│   ├── Helpers/
│   └── Options/
├── Boilerplate.CrossCutting.IOC/   # Configuração de injeção de dependência
│   └── DependencyInjection/        (ConfigureBindings*)
├── Boilerplate.Migration/          # Migrations EF Core
│   └── Migrations/
├── Boilerplate.Tests/              # Testes unitários (espelha Features da Application)
│   └── Features/
│       └── Products/
│           ├── Commands/CreateProduct/
│           └── Queries/GetProductById/, ListProducts/
├── docs/
│   └── ESTRUTURA.md
└── deploy/
```

## Projetos e responsabilidades

### Boilerplate.Interface

- **Uso:** camada de entrada (API REST). Controllers recebem HTTP e delegam para MediatR ou serviços.
- **Conteúdo:** `Controllers/`, `Program.cs`, `appsettings`, `Extensions` (ex.: Swagger).
- **Regra:** não contém regra de negócio; apenas orquestra chamadas a Application e expõe DTOs.

### Boilerplate.Application

- **Uso:** orquestração e regras de aplicação (CQRS). Um **feature** por pasta em `Features/`.
- **Estrutura por feature (ex.: Products):**
  - **Commands/** — um comando por pasta: `CreateProduct/`, `UpdateProduct/`, `DeleteProduct/` (Command, Handler, Validator quando houver).
  - **Queries/** — uma query por pasta: `ListProducts/`, `GetProductById/` (Query, Handler).
  - DTOs da API ficam em **CrossCutting.Dto**. Se a feature precisar de DTOs ou validadores compartilhados específicos, crie `DTOs/` ou `Validators/` dentro da pasta da feature.
- **Regra:** novas operações = nova pasta em Commands ou Queries; handlers usam repositórios e interfaces do Domain.

### Boilerplate.Domain

- **Uso:** entidades de domínio e contratos (interfaces). Sem referência a EF, HTTP ou infra.
- **Conteúdo:** `Entities/`, `Interfaces/` (Repositories, UnitOfWork, Services, Integration), `Services/` (implementações em domínio quando fizer sentido).
- **Regra:** interfaces definem o que a aplicação precisa; implementações de infra ficam em Infrastructure ou CrossCutting.

### Boilerplate.Infrastructure

- **Uso:** implementações de persistência (EF Core, repositórios, unit of work).
- **Conteúdo:** `Persistence/` (DbContext, Map com configurações de entidade), `Repositories/`, `UnitOfWork/`.
- **Regra:** único projeto que referencia EF Core e acessa o banco; implementa interfaces do Domain.

### Boilerplate.CrossCutting

- **Uso:** tipos e configurações compartilhados entre camadas (DTOs de API, opções, helpers).
- **Conteúdo:** `Dto/Products/` (ProductDto, ExternalProductDto), `Options/`, `Helpers/`.
- **Regra:** sem lógica de negócio; apenas estruturas e configurações.

### Boilerplate.CrossCutting.IOC

- **Uso:** registro de dependências (DI). Agrupa os `ConfigureBindings*` que registram serviços, repositórios, MediatR, etc.
- **Regra:** Interface referencia este projeto e chama os métodos de configuração em `Program.cs`.

### Boilerplate.Migration

- **Uso:** projeto dedicado a rodar migrações EF Core (geração e aplicação).
- **Regra:** referencia Infrastructure (ou o projeto que contém o DbContext) e expõe o contexto para migrations.

### Boilerplate.Tests

- **Uso:** testes unitários (e de integração, se houver). Estrutura espelha `Application/Features/`.
- **Conteúdo atual:** `Features/Products/Commands/CreateProduct/`, `Queries/GetProductById/`, `Queries/ListProducts/` com testes dos handlers.
- **Regra:** um teste por handler/command/query relevante; mocks para repositórios e serviços.

## Fluxo de uma requisição (ex.: criar produto)

1. **Interface:** `ProductsController` recebe o request e envia `CreateProductCommand` via MediatR.
2. **Application:** `CreateProductHandler` processa o comando, usa `IProductRepository`/UnitOfWork (contratos do Domain).
3. **Domain:** define `Product`, `IProductRepository`, etc.
4. **Infrastructure:** implementa `ProductRepository` e persistência com EF Core.
5. **CrossCutting:** DTOs (ex.: `ProductDto`) usados na API e nos handlers.

## Resumo

| Projeto | Quando usar |
|---------|-------------|
| **Interface** | Novos endpoints = novo controller ou novos métodos; delegar para MediatR. |
| **Application** | Nova operação = nova pasta em Commands ou Queries dentro de `Features/<Feature>/`. |
| **Domain** | Nova entidade = classe em Entities + interfaces em Interfaces (repositório, etc.). |
| **Infrastructure** | Nova entidade = config em Persistence/Map, repositório em Repositories, UnitOfWork se precisar. |
| **CrossCutting** | Novo DTO ou opção compartilhada = Dto/ ou Options/. |
| **CrossCutting.IOC** | Novo serviço/repositório = novo ou existente `ConfigureBindings*.cs`. |
| **Migration** | Alteração de modelo = nova migration. |
| **Tests** | Novo handler/comando/query = testes em Features/ espelhando a Application. |

Manter essa estrutura facilita escalar com novas features (nova pasta em Application + Domain + Infrastructure + testes) sem misturar responsabilidades entre camadas.
