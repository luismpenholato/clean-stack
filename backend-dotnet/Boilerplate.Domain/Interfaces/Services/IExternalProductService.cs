using Boilerplate.CrossCutting.Dto.Products;

namespace Boilerplate.Domain.Interfaces.Services;

public interface IExternalProductService
{
    Task<IReadOnlyList<ExternalProductDto>> GetProductsAsync(CancellationToken cancellationToken = default);

    Task<ExternalProductDto?> GetProductByIdAsync(int id, CancellationToken cancellationToken = default);
}
