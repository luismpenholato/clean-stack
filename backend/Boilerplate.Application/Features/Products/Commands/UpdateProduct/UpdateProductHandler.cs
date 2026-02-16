using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentValidation;
using MediatR;

namespace Boilerplate.Application.Features.Products.Commands.UpdateProduct;

public sealed class UpdateProductHandler : IRequestHandler<UpdateProductCommand, ProductDto?>
{
    private readonly IProductUnitOfWork _uow;
    private readonly IValidator<UpdateProductCommand> _validator;

    public UpdateProductHandler(IProductUnitOfWork uow, IValidator<UpdateProductCommand> validator)
    {
        _uow = uow;
        _validator = validator;
    }

    public async Task<ProductDto?> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var product = await _uow.ProductRepository.GetByIdTrackingAsync(request.Id, cancellationToken);

        if (product is null) return null;

        product.Name = request.Name.Trim();
        product.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        product.Price = request.Price;
        product.IsActive = request.IsActive;

        await _uow.SaveChangesAsync(cancellationToken);

        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            IsActive = product.IsActive,
            CreatedAtUtc = product.CreatedAtUtc
        };
    }
}
