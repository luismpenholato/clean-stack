using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.GetProductById;

public sealed class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    private readonly IProductUnitOfWork _uow;

    public GetProductByIdHandler(IProductUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _uow.ProductRepository.GetByIdAsync(request.Id, cancellationToken);

        if (product is null)
        {
            return null;
        }

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
