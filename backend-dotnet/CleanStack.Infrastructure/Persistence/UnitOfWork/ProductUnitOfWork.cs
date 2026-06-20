using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Domain.Interfaces.UnitOfWork;
namespace CleanStack.Infrastructure.Persistence.UnitOfWork;

public sealed class ProductUnitOfWork : IProductUnitOfWork
{
    private readonly AppDbContext _context;

    public ProductUnitOfWork(AppDbContext context, IProductRepository productRepository)
    {
        _context = context;
        ProductRepository = productRepository;
    }

    public IProductRepository ProductRepository { get; }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken) => _context.SaveChangesAsync(cancellationToken);
}
