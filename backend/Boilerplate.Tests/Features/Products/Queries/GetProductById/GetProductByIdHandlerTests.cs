using Boilerplate.Application.Features.Products.Queries.GetProductById;
using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using NSubstitute;
using Xunit;

namespace Boilerplate.Tests.Features.Products.Queries.GetProductById;

[Trait("Category", "Products")]
public class GetProductByIdHandlerTests
{
    [Fact]
    public async Task Handle_ProdutoEncontrado_RetornaProductDto()
    {
        var id = 42L;
        var product = new Product { Id = id, Name = "Produto", Price = 99, IsActive = true, CreatedAtUtc = DateTime.UtcNow };

        var repo = Substitute.For<IProductRepository>();
        repo.GetByIdAsync(id, Arg.Any<CancellationToken>()).Returns(product);

        var uow = Substitute.For<IProductUnitOfWork>();
        uow.ProductRepository.Returns(repo);

        var handler = new GetProductByIdHandler(uow);
        var result = await handler.Handle(new GetProductByIdQuery(id), CancellationToken.None);

        result.Should().NotBeNull();
        result!.Name.Should().Be("Produto");
        result.Price.Should().Be(99);
    }

    [Fact]
    public async Task Handle_ProdutoNaoEncontrado_RetornaNull()
    {
        var repo = Substitute.For<IProductRepository>();
        repo.GetByIdAsync(Arg.Any<long>(), Arg.Any<CancellationToken>()).Returns((Product?)null);

        var uow = Substitute.For<IProductUnitOfWork>();
        uow.ProductRepository.Returns(repo);

        var handler = new GetProductByIdHandler(uow);
        var result = await handler.Handle(new GetProductByIdQuery(999), CancellationToken.None);

        result.Should().BeNull();
    }
}
