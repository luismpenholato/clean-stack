using CleanStack.CrossCutting.Dto.Products;
using MediatR;

namespace CleanStack.Application.Features.Products.Commands.CreateProduct;

public sealed record CreateProductCommand(
    string? Name,
    string? Description,
    decimal? Price,
    bool IsActive = true,
    int? ImportFromExternalId = null) : IRequest<ProductDto>;
