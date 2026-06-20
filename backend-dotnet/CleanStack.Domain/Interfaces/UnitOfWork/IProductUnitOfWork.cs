using CleanStack.Domain.Interfaces.Repositories;

namespace CleanStack.Domain.Interfaces.UnitOfWork;

public interface IProductUnitOfWork
{
    IProductRepository ProductRepository { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
