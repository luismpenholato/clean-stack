using CleanStack.CrossCutting.Dto.Products;
using MediatR;

namespace CleanStack.Application.Features.Products.Commands.UpdateProduct;

public sealed record UpdateProductCommand(
    long Id,
    string Name,
    string? Description,
    decimal Price,
    bool IsActive = true) : IRequest<ProductDto?>;
