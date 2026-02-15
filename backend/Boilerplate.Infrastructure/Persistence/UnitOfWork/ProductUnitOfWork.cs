using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.UnitOfWork;
namespace Boilerplate.Infrastructure.Persistence.UnitOfWork;

public sealed class ProductUnitOfWork : IProductUnitOfWork
{
    private readonly AppDbContext _context;
    private readonly IProductRepository _productRepository;

    public ProductUnitOfWork(AppDbContext context, IProductRepository productRepository)
    {
        _context = context;
        _productRepository = productRepository;
    }

    public IProductRepository ProductRepository => _productRepository;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}
