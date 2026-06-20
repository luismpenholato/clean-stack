using CleanStack.Domain.Entities;

namespace CleanStack.Domain.Interfaces.Repositories;

public interface IProductRepository : ICrudRepository<Product, long>
{
}
