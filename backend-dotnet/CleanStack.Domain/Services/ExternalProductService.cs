using CleanStack.CrossCutting.Dto.Products;
using CleanStack.Domain.Interfaces.Integration;
using CleanStack.Domain.Interfaces.Services;
using Refit;

namespace CleanStack.Domain.Services;

public sealed class ExternalProductService : IExternalProductService
{
    private readonly IExternalProductIntegration _integration;

    public ExternalProductService(IExternalProductIntegration integration)
    {
        _integration = integration;
    }

    public Task<IReadOnlyList<ExternalProductDto>> GetProductsAsync(CancellationToken cancellationToken = default) =>
        _integration.GetProductsAsync(cancellationToken);

    public async Task<ExternalProductDto?> GetProductByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _integration.GetProductByIdAsync(id, cancellationToken);
        }
        catch (ApiException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }
}
