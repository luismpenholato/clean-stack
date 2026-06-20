using Boilerplate.CrossCutting.Dto.Products;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.ListProducts;

public sealed record ListProductsQuery() : IRequest<IReadOnlyList<ProductDto>>;
