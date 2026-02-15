# Boilerplate

Monorepo com backend e frontend prontos para servir de base para novos projetos.

## Stack

| Camada | Tecnologia |
|--------|------------|
| **Backend** | .NET 9, ASP.NET Core, EF Core, MediatR (CQRS), FluentValidation, Serilog |
| **Frontend** | Angular 21, ng-zorro-antd, RxJS, TypeScript, Vitest |
| **Infra** | Docker, Nginx, Kubernetes (manifests) |

## Estrutura

```
├── backend/    → API REST (.NET 9)
├── frontend/   → SPA (Angular 21)
└── README.md
```

Cada pasta possui seu próprio README com instruções detalhadas e uma pasta `docs/` com a documentação de estrutura do projeto.

## Quick start

### Backend

```bash
cd backend
dotnet run --project Boilerplate.Interface
```

Swagger: [https://localhost:7196/swagger](https://localhost:7196/swagger)

### Frontend

```bash
cd frontend
npm install
npm start
```

App: [http://localhost:3000](http://localhost:3000)

## Pré-requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js v24+](https://nodejs.org/)
- npm (incluso no Node)
- Docker (opcional, para deploy)

## Deploy

Ambos os projetos possuem Dockerfiles e manifests Kubernetes na pasta `deploy/`:

```bash
# Backend
cd backend
docker build -t bp-api:latest -f Boilerplate.Interface/Dockerfile .

# Frontend
cd frontend
docker build -t bp-frontend:latest .
```

Detalhes em [`backend/README.md`](backend/README.md) e [`frontend/README.md`](frontend/README.md).
