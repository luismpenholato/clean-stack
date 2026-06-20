using Boilerplate.CrossCutting.Dto.Products;
using Refit;

namespace Boilerplate.Domain.Interfaces.Integration;

public interface IExternalProductIntegration
{
    [Get("/products")]
    Task<IReadOnlyList<ExternalProductDto>> GetProductsAsync(CancellationToken cancellationToken = default);

    [Get("/products/{id}")]
    Task<ExternalProductDto> GetProductByIdAsync(int id, CancellationToken cancellationToken = default);
}
