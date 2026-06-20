using CleanStack.CrossCutting.Dto.Products;
using MediatR;

namespace CleanStack.Application.Features.Products.Queries.ListProducts;

public sealed record ListProductsQuery() : IRequest<IReadOnlyList<ProductDto>>;
