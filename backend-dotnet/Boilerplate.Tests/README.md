# Boilerplate.Tests

Backend unit tests. Structure **mirrors** `Boilerplate.Application/Features/`.

## Stack

| Package | Usage |
|--------|-----|
| **xUnit 2.9** | Test framework |
| **FluentAssertions 8** | Readable asserts |
| **NSubstitute 5** | Interface mocks (UoW, repositories, services, validators) |
| **Microsoft.NET.Test.Sdk 18** | Test runner |
| **coverlet.collector** | Code coverage (CI) |

## How to run

From the `backend-dotnet` folder:

```bash
dotnet test backend-dotnet.sln
```

Or only the test project:

```bash
dotnet test Boilerplate.Tests
```

Filter by feature:

```bash
dotnet test --filter Category=Products
```

## Structure

```txt
Boilerplate.Tests/
  Features/
    Products/
      Commands/
        CreateProduct/
          CreateProductHandlerTests.cs
          CreateProductValidatorTests.cs
        UpdateProduct/
          UpdateProductHandlerTests.cs
          UpdateProductValidatorTests.cs
        DeleteProduct/
          DeleteProductHandlerTests.cs
      Queries/
        GetProductById/
          GetProductByIdHandlerTests.cs
        ListProducts/
          ListProductsHandlerTests.cs
        ListExternalProducts/
          ListExternalProductsHandlerTests.cs
```

## Conventions

### Handler tests (`*HandlerTests.cs`)

- Test **handler logic** (mapping, repository/service calls, return values).
- Dependencies mocked with **NSubstitute** (`IProductUnitOfWork`, `IProductRepository`, `IExternalProductService`).
- When the handler uses FluentValidation, mock `IValidator<TCommand>` with an empty `ValidationResult` — rule validation belongs in `*ValidatorTests`.
- One file per handler, in the same relative folder as Application.

### Validator tests (`*ValidatorTests.cs`)

- Instantiate the real validator (`new CreateProductValidator()`).
- Call `Validate(command)` and assert `IsValid` and `Errors`.
- Cover input rules (required field, length, conditional `.When()`).
- Only exist when there is `AbstractValidator<T>` in the feature.

### Queries without validator

- Only `*HandlerTests.cs` (e.g., `ListProducts`, `GetProductById`).

## New feature — test checklist

When creating `Features/{Feature}/Commands/{Command}/` or `Queries/{Query}/` in Application:

1. Create mirrored folder in `Boilerplate.Tests/Features/{Feature}/`.
2. Add `{Command}HandlerTests.cs` or `{Query}HandlerTests.cs`.
3. If there is a validator, add `{Command}ValidatorTests.cs`.
4. Use `[Trait("Category", "{Feature}")]` to filter: `dotnet test --filter Category=Products`.

## Current coverage (Products)

| Type | File |
|------|---------|
| Handler | CreateProduct, UpdateProduct, DeleteProduct |
| Handler | GetProductById, ListProducts, ListExternalProducts |
| Validator | CreateProduct, UpdateProduct |

## Project references

- `Boilerplate.Application` — handlers and validators under test
- `Boilerplate.Domain` — entities and mocked interfaces
- `Boilerplate.CrossCutting` — DTOs used in asserts
