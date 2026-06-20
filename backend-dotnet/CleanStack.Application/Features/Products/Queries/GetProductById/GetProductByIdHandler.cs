using CleanStack.CrossCutting.Dto.Products;
using CleanStack.Domain.Entities;
using CleanStack.Domain.Interfaces.UnitOfWork;
using MediatR;

namespace CleanStack.Application.Features.Products.Queries.GetProductById;

public sealed class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    private readonly IProductUnitOfWork _uow;

    public GetProductByIdHandler(IProductUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        Product? product = await _uow.ProductRepository.GetByIdAsync(request.Id, cancellationToken);

        return product is null
            ? null
            : new ProductDto
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
