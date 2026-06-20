using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Infrastructure.Repositories;

public sealed class ProductRepository : RepositoryBase<Product, long>, IProductRepository
{
    public ProductRepository(AppDbContext context) : base(context)
    {
    }

    public override async Task<IReadOnlyList<Product>> ListAsync(CancellationToken cancellationToken) => await Set.AsNoTracking().OrderBy(p => p.Name).ToListAsync(cancellationToken);
}
