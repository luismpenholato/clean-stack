using Boilerplate.CrossCutting.Dto.Products;
using MediatR;

namespace Boilerplate.Application.Features.Products.Queries.GetProductById;

public sealed record GetProductByIdQuery(long Id) : IRequest<ProductDto?>;
