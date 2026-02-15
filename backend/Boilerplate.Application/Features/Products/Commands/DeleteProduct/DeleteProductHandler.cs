using Boilerplate.Domain.Interfaces.UnitOfWork;
using MediatR;

namespace Boilerplate.Application.Features.Products.Commands.DeleteProduct;

public sealed class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
{
    private readonly IProductUnitOfWork _uow;

    public DeleteProductHandler(IProductUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        return await _uow.ProductRepository.DeleteAsync(request.Id, cancellationToken);
    }
}
