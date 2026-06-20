using Boilerplate.Application.Features.Products.Queries.ListExternalProducts;
using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.Services;
using FluentAssertions;
using NSubstitute;

namespace Boilerplate.Tests.Features.Products.Queries.ListExternalProducts;

[Trait("Category", "Products")]
public class ListExternalProductsHandlerTests
{
    [Fact]
    public async Task Handle_RetornaProdutosDaIntegracao()
    {
        var externalProducts = new List<ExternalProductDto>
        {
            new() { Id = 1, Title = "Externo A", Price = 10m },
            new() { Id = 2, Title = "Externo B", Price = 20m },
        };

        IExternalProductService externalProductService = Substitute.For<IExternalProductService>();
        _ = externalProductService.GetProductsAsync(Arg.Any<CancellationToken>()).Returns(externalProducts);

        var handler = new ListExternalProductsHandler(externalProductService);
        IReadOnlyList<ExternalProductDto> result = await handler.Handle(new ListExternalProductsQuery(), CancellationToken.None);

        _ = result.Should().HaveCount(2);
        _ = result[0].Title.Should().Be("Externo A");
        _ = result[1].Title.Should().Be("Externo B");
    }

    [Fact]
    public async Task Handle_SemProdutos_RetornaListaVazia()
    {
        IExternalProductService externalProductService = Substitute.For<IExternalProductService>();
        _ = externalProductService.GetProductsAsync(Arg.Any<CancellationToken>())
            .Returns([]);

        var handler = new ListExternalProductsHandler(externalProductService);
        IReadOnlyList<ExternalProductDto> result = await handler.Handle(new ListExternalProductsQuery(), CancellationToken.None);

        _ = result.Should().BeEmpty();
    }
}
