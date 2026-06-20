using MediatR;

namespace Boilerplate.Application.Features.Products.Commands.DeleteProduct;

public sealed record DeleteProductCommand(long Id) : IRequest<bool>;
