using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.Services;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.ListExternalProducts;

public sealed class ListExternalProductsHandler : IRequestHandler<ListExternalProductsQuery, IReadOnlyList<ExternalProductDto>>
{
    private readonly IExternalProductService _externalProductService;

    public ListExternalProductsHandler(IExternalProductService externalProductService)
    {
        _externalProductService = externalProductService;
    }

    public async Task<IReadOnlyList<ExternalProductDto>> Handle(ListExternalProductsQuery request, CancellationToken cancellationToken)
    {
        return await _externalProductService.GetProductsAsync(cancellationToken);
    }
}
