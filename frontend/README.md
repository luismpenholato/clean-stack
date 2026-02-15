# Boilerplate Frontend

SPA em Angular que consome a API do backend Boilerplate.

## Tecnologias

- **Angular 21** – Framework SPA
- **Angular CLI** – Build e ferramentas
- **ng-zorro-antd** – Componentes de UI
- **Angular CDK** – Component Dev Kit
- **RxJS 7** – Programação reativa
- **TypeScript 5.9** – Linguagem
- **Vitest** – Testes unitários (via `ng test`)
- **Prettier** – Formatação de código

## Pré-requisitos

- [Node.js](https://nodejs.org/) **v24+** (testado com 24.13.1)
- npm (já incluso no Node)

## Como executar

### Instalar dependências

```bash
npm install
```

### Servidor de desenvolvimento

```bash
npm start
```

Roda na porta **3000**: [http://localhost:3000/](http://localhost:3000/). A aplicação recarrega automaticamente ao alterar os arquivos.

### Build para produção

```bash
npm run build
```

ou

```bash
ng build
```

A saída fica em `dist/`.

### Testes

```bash
npm test
```

ou

```bash
ng test
```

Executa os testes com Vitest.

## Configuração da API

O frontend chama a API do backend. Em desenvolvimento, garanta que a API está rodando em `http://localhost:5000` (HTTP) ou `https://localhost:5001` (HTTPS). A URL da API é definida em `src/environments/environment.development.ts` (`apiBaseUrl`).

## Deploy

### Docker (multi-stage)

Constrói e serve a aplicação em um único comando:

```bash
docker build -t bp-frontend:latest .
docker run -p 80:80 bp-frontend:latest
```

### Docker (publish)

Se preferir fazer o build localmente e gerar uma imagem mais leve:

```bash
npm run build
docker build -t bp-frontend:latest -f Dockerfile.publish ./dist/boilerplate-frontend/browser
docker run -p 80:80 bp-frontend:latest
```

### Kubernetes

Manifests na pasta `deploy/`. Ajuste a imagem e aplique:

```bash
kubectl apply -f deploy/frontend.yaml
```

## Estrutura

- `src/` – Código fonte da aplicação
- `public/` – Assets estáticos
- `deploy/` – Manifests Kubernetes
- `angular.json` – Configuração do Angular CLI
- `Dockerfile` – Build multi-stage (Node + Nginx)
- `Dockerfile.publish` – Imagem a partir do build local
- `nginx.conf` – Configuração do Nginx para SPA

Para gerar novos componentes:

```bash
ng generate component nome-do-componente
```

Mais comandos: `ng generate --help`.
