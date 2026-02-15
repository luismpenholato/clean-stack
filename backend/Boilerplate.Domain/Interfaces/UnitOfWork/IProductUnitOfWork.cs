using Boilerplate.Domain.Interfaces.Repositories;

namespace Boilerplate.Domain.Interfaces.UnitOfWork;

public interface IProductUnitOfWork
{
    IProductRepository ProductRepository { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
