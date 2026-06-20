using CleanStack.Application.Features.Products.Queries.GetProductById;
using CleanStack.CrossCutting.Dto.Products;
using CleanStack.Domain.Entities;
using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using NSubstitute;

namespace CleanStack.Tests.Features.Products.Queries.GetProductById;

[Trait("Category", "Products")]
public class GetProductByIdHandlerTests
{
    [Fact]
    public async Task Handle_ProdutoEncontrado_RetornaProductDto()
    {
        long id = 42L;
        var product = new Product { Id = id, Name = "Produto", Price = 99, IsActive = true, CreatedAtUtc = DateTime.UtcNow };

        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.GetByIdAsync(id, Arg.Any<CancellationToken>()).Returns(product);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new GetProductByIdHandler(uow);
        ProductDto? result = await handler.Handle(new GetProductByIdQuery(id), CancellationToken.None);

        _ = result.Should().NotBeNull();
        _ = result.Name.Should().Be("Produto");
        _ = result.Price.Should().Be(99);
    }

    [Fact]
    public async Task Handle_ProdutoNaoEncontrado_RetornaNull()
    {
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.GetByIdAsync(Arg.Any<long>(), Arg.Any<CancellationToken>()).Returns((Product?)null);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new GetProductByIdHandler(uow);
        ProductDto? result = await handler.Handle(new GetProductByIdQuery(999), CancellationToken.None);

        _ = result.Should().BeNull();
    }
}
