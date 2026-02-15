using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.ListProducts;

public sealed class ListProductsHandler : IRequestHandler<ListProductsQuery, IReadOnlyList<ProductDto>>
{
    private readonly IProductUnitOfWork _uow;

    public ListProductsHandler(IProductUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<IReadOnlyList<ProductDto>> Handle(ListProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _uow.ProductRepository.ListAsync(cancellationToken);

        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            IsActive = p.IsActive,
            CreatedAtUtc = p.CreatedAtUtc
        }).ToList();
    }
}
