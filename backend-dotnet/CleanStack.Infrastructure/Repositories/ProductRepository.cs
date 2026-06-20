using CleanStack.Domain.Entities;
using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CleanStack.Infrastructure.Repositories;

public sealed class ProductRepository : RepositoryBase<Product, long>, IProductRepository
{
    public ProductRepository(AppDbContext context) : base(context)
    {
    }

    public override async Task<IReadOnlyList<Product>> ListAsync(CancellationToken cancellationToken) => await Set.AsNoTracking().OrderBy(p => p.Name).ToListAsync(cancellationToken);
}
