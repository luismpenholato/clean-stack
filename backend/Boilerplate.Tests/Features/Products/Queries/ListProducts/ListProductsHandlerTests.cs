using Boilerplate.Application.Features.Products.Queries.ListProducts;
using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using NSubstitute;
using Xunit;

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

        var repo = Substitute.For<IProductRepository>();
        repo.ListAsync(Arg.Any<CancellationToken>()).Returns(products);

        var uow = Substitute.For<IProductUnitOfWork>();
        uow.ProductRepository.Returns(repo);

        var handler = new ListProductsHandler(uow);
        var result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

        result.Should().HaveCount(2);
        result[0].Name.Should().Be("A");
        result[1].Name.Should().Be("B");
    }

    [Fact]
    public async Task Handle_SemProdutos_RetornaListaVazia()
    {
        var repo = Substitute.For<IProductRepository>();
        repo.ListAsync(Arg.Any<CancellationToken>()).Returns(new List<Product>());

        var uow = Substitute.For<IProductUnitOfWork>();
        uow.ProductRepository.Returns(repo);

        var handler = new ListProductsHandler(uow);
        var result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

        result.Should().BeEmpty();
    }
}
