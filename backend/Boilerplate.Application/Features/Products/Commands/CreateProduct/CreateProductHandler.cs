using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Services;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentValidation;
using MediatR;

namespace Boilerplate.Application.Features.Products.Commands.CreateProduct;

public sealed class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IValidator<CreateProductCommand> _validator;
    private readonly IExternalProductService _externalProductService;

    public CreateProductHandler(
        IProductUnitOfWork uow,
        IValidator<CreateProductCommand> validator,
        IExternalProductService externalProductService)
    {
        _uow = uow;
        _validator = validator;
        _externalProductService = externalProductService;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        string name;
        string? description;
        decimal price;

        if (request.ImportFromExternalId.HasValue)
        {
            var external = await _externalProductService.GetProductByIdAsync(request.ImportFromExternalId.Value, cancellationToken);

            if (external is null)
                throw new InvalidOperationException($"Produto externo com id {request.ImportFromExternalId} não encontrado.");

            name = external.Title ?? "Sem título";
            description = external.Description;
            price = external.Price;
        }
        else
        {
            name = (request.Name ?? string.Empty).Trim();

            if (string.IsNullOrWhiteSpace(name))
                throw new InvalidOperationException("Nome é obrigatório quando não está importando da API externa.");

            description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
            price = request.Price ?? 0;
        }

        var product = new Product
        {
            Name = name,
            Description = description,
            Price = price,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow
        };

        await _uow.ProductRepository.AddAsync(product, cancellationToken);

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            IsActive = product.IsActive,
            CreatedAtUtc = product.CreatedAtUtc
        };
    }
}
