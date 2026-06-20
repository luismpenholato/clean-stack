using Boilerplate.Application.Features.Products.Queries.ListProducts;
using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using NSubstitute;

namespace Boilerplate.Tests.Features.Products.Queries.ListProducts;

[Trait("Category", "Products")]
public class ListProductsHandlerTests
{
    [Fact]
    public async Task Handle_RetornaListaDeProductDto()
    {
        var products = new List<Product>
        {
            new() { Id = 1, Name = "A", Price = 1, IsActive = true, CreatedAtUtc = DateTime.UtcNow },
            new() { Id = 2, Name = "B", Price = 2, IsActive = true, CreatedAtUtc = DateTime.UtcNow }
        };

        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.ListAsync(Arg.Any<CancellationToken>()).Returns(products);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new ListProductsHandler(uow);
        IReadOnlyList<ProductDto> result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

        _ = result.Should().HaveCount(2);
        _ = result[0].Name.Should().Be("A");
        _ = result[1].Name.Should().Be("B");
    }

    [Fact]
    public async Task Handle_SemProdutos_RetornaListaVazia()
    {
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.ListAsync(Arg.Any<CancellationToken>()).Returns([]);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        var handler = new ListProductsHandler(uow);
        IReadOnlyList<ProductDto> result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

        _ = result.Should().BeEmpty();
    }
}
