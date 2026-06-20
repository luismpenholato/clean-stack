using CleanStack.CrossCutting.Dto.Products;
using CleanStack.Domain.Interfaces.Services;
using MediatR;

namespace CleanStack.Application.Features.Products.Queries.ListExternalProducts;

public sealed class ListExternalProductsHandler : IRequestHandler<ListExternalProductsQuery, IReadOnlyList<ExternalProductDto>>
{
    private readonly IExternalProductService _externalProductService;

    public ListExternalProductsHandler(IExternalProductService externalProductService)
    {
        _externalProductService = externalProductService;
    }

    public async Task<IReadOnlyList<ExternalProductDto>> Handle(ListExternalProductsQuery request, CancellationToken cancellationToken) => await _externalProductService.GetProductsAsync(cancellationToken);
}
