using CleanStack.CrossCutting.Dto.Products;
using MediatR;

namespace CleanStack.Application.Features.Products.Queries.ListExternalProducts;

public sealed record ListExternalProductsQuery() : IRequest<IReadOnlyList<ExternalProductDto>>;
