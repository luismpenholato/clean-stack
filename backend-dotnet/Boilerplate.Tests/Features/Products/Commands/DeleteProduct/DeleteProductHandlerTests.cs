using Boilerplate.Application.Features.Products.Commands.DeleteProduct;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using NSubstitute;

namespace Boilerplate.Tests.Features.Products.Commands.DeleteProduct;

[Trait("Category", "Products")]
public class DeleteProductHandlerTests
{
    [Fact]
    public async Task Handle_QuandoRepositorioExclui_RetornaTrue()
    {
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.DeleteAsync(1, Arg.Any<CancellationToken>()).Returns(true);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new DeleteProductHandler(uow);
        var result = await handler.Handle(new DeleteProductCommand(1), CancellationToken.None);

        _ = result.Should().BeTrue();
        _ = await repo.Received(1).DeleteAsync(1, Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_QuandoRepositorioNaoEncontra_RetornaFalse()
    {
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.DeleteAsync(Arg.Any<long>(), Arg.Any<CancellationToken>()).Returns(false);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new DeleteProductHandler(uow);
        var result = await handler.Handle(new DeleteProductCommand(999), CancellationToken.None);

        _ = result.Should().BeFalse();
    }
}
