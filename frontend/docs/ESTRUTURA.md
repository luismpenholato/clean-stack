# Estrutura do projeto Angular

Este documento descreve a organização de pastas e componentes adotada no projeto, alinhada às práticas atuais de mercado (feature-based + shared).

## Visão geral

```
src/app/
├── layout/                    # Shell da aplicação (menu, sidebar, outlet)
│   └── main-layout/           # Layout principal (uma pasta por layout)
│       ├── main-layout.component.ts
│       ├── main-layout.component.html
│       └── main-layout.component.scss
├── pages/                     # Telas/features — uma pasta por rota ou domínio
│   └── products/
│       ├── product-form/      # Formulário de criação/edição
│       │   ├── product-form.component.ts
│       │   ├── product-form.component.html
│       │   └── product-form.component.scss
│       ├── products-list/     # Listagem de produtos
│       │   ├── products-list.component.ts
│       │   ├── products-list.component.html
│       │   ├── products-list.component.scss
│       │   └── products-list.component.spec.ts
│       ├── product.model.ts
│       ├── product.service.ts
│       └── product.service.spec.ts
├── shared/                    # Reutilizáveis: componentes, pipes, diretivas, utils
│   ├── components/
│   │   ├── page-header/       # Header de página com título, subtítulo e breadcrumb
│   │   └── loading/           # Wrapper de loading com spinner
│   ├── directives/
│   │   └── autofocus/         # Diretiva de autofocus em inputs
│   ├── interceptors/
│   │   └── http-error.interceptor.ts  # Interceptor global de erros HTTP
│   ├── pipes/
│   │   └── truncate/          # Pipe para truncar texto
│   └── utils/
│       └── http-error.util.ts # Parser de mensagens de erro da API
├── app.routes.ts
├── app.config.ts
├── app.html
├── app.ts
└── app.spec.ts
```

## Convenções

### `layout/`

- **Uso:** componentes que definem o esqueleto da aplicação (sidebar, header, área de conteúdo com `<router-outlet>`).
- **Estrutura:** uma **pasta por layout**, no mesmo padrão de `shared/components/`:
  - `main-layout/` — layout principal (header + drawer de navegação + conteúdo)
  - Futuros: `auth-layout/`, `public-layout/`, etc.
- **Regra:** um layout por "tipo" de tela. Cada pasta contém `*.component.ts`, `*.component.html`, `*.component.scss`.

### `pages/`

- **Uso:** uma pasta por **feature/tela**. Tudo que pertence àquela tela fica junto (componentes, service, model, testes).
- **Padrão:** `pages/<nome-da-feature>/`
  - Subpastas por componente: `product-form/`, `products-list/` — cada uma com `*.component.ts/html/scss`
  - `*.service.ts` — serviços da feature
  - `*.model.ts` — interfaces/types da feature
  - `*.spec.ts` — testes
- **Exemplo:** `pages/products/` (product-form, products-list, product.service, product.model).
- **Regra:** novas telas = nova pasta em `pages/` (ex.: `pages/users/`, `pages/dashboard/`).

### `shared/`

- **Uso:** código reutilizado em mais de uma feature.
- **Estrutura:**
  - **`shared/components/`** — componentes genéricos (ex.: `page-header`, `loading`). Um componente por subpasta com `.component.ts/html/scss`.
  - **`shared/directives/`** — diretivas reutilizáveis (ex.: `autofocus`). Uma diretiva por subpasta.
  - **`shared/interceptors/`** — interceptors HTTP globais (ex.: tratamento de erros).
  - **`shared/pipes/`** — pipes reutilizáveis (ex.: `truncate`). Um pipe por subpasta.
  - **`shared/utils/`** — funções utilitárias puras (ex.: parser de erros da API).
- **Regra:** se for usado em uma única tela, pode ficar em `pages/<feature>/`; se for usado em várias, vai para a pasta correspondente em `shared/`.

### Rotas

- Rotas de telas apontam para os componentes em `pages/<feature>/...`.
- O layout (ex.: `main-layout`) envolve o conteúdo e contém o `<router-outlet>` onde as rotas são renderizadas.

## Resumo

| Pasta | Quando usar |
|-------|-------------|
| `layout/` | Shell da aplicação (menu, layout, outlet). Uma pasta por tipo de layout. |
| `pages/` | Uma pasta por tela/feature; tudo da feature junto. |
| `shared/components/` | Componentes usados em várias partes do app. |
| `shared/directives/` | Diretivas usadas em várias partes do app. |
| `shared/interceptors/` | Interceptors HTTP globais. |
| `shared/pipes/` | Pipes usados em várias partes do app. |
| `shared/utils/` | Funções utilitárias compartilhadas. |

Manter essa estrutura garante consistência e facilita escalar o projeto com novas telas e reutilizáveis.
