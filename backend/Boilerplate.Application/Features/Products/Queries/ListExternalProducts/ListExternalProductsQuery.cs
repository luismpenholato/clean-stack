using Boilerplate.CrossCutting.Dto.Products;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.ListExternalProducts;

public sealed record ListExternalProductsQuery() : IRequest<IReadOnlyList<ExternalProductDto>>;
