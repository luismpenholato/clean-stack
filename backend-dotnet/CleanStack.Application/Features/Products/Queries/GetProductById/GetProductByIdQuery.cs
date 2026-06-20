using CleanStack.CrossCutting.Dto.Products;
using MediatR;

namespace CleanStack.Application.Features.Products.Queries.GetProductById;

public sealed record GetProductByIdQuery(long Id) : IRequest<ProductDto?>;
