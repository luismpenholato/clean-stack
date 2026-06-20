using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Domain.Interfaces.Services;
using Boilerplate.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace Boilerplate.Tests.Features.Products.Commands.CreateProduct;

[Trait("Category", "Products")]
public class CreateProductHandlerTests
{
    [Fact]
    public async Task Handle_CommandValido_RetornaProductDto()
    {
        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = uow.ProductRepository.Returns(repo);

        IValidator<CreateProductCommand> validator = Substitute.For<IValidator<CreateProductCommand>>();
        _ = validator.ValidateAsync(Arg.Any<CreateProductCommand>(), Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        IExternalProductService externalProductService = Substitute.For<IExternalProductService>();

        var handler = new CreateProductHandler(uow, validator, externalProductService);
        var command = new CreateProductCommand("Produto Teste", "Descrição", 10.50m, true, null);

        ProductDto result = await handler.Handle(command, CancellationToken.None);

        _ = result.Should().NotBeNull();
        _ = result.Name.Should().Be("Produto Teste");
        _ = result.Description.Should().Be("Descrição");
        _ = result.Price.Should().Be(10.50m);
        _ = result.IsActive.Should().BeTrue();
        _ = result.Id.Should().BeGreaterThanOrEqualTo(0);
        await repo.Received(1).AddAsync(Arg.Is<Product>(p => p.Name == "Produto Teste"), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ImportFromExternalId_PreencheDadosDaIntegracao()
    {
        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = uow.ProductRepository.Returns(repo);

        IValidator<CreateProductCommand> validator = Substitute.For<IValidator<CreateProductCommand>>();
        _ = validator.ValidateAsync(Arg.Any<CreateProductCommand>(), Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        IExternalProductService externalProductService = Substitute.For<IExternalProductService>();
        _ = externalProductService.GetProductByIdAsync(5, Arg.Any<CancellationToken>()).Returns(new ExternalProductDto
        {
            Id = 5,
            Title = "Produto Externo",
            Description = "Desc externa",
            Price = 99.90m
        });

        var handler = new CreateProductHandler(uow, validator, externalProductService);
        var command = new CreateProductCommand(null, null, null, true, 5);

        ProductDto result = await handler.Handle(command, CancellationToken.None);

        _ = result.Should().NotBeNull();
        _ = result.Name.Should().Be("Produto Externo");
        _ = result.Description.Should().Be("Desc externa");
        _ = result.Price.Should().Be(99.90m);
        _ = await externalProductService.Received(1).GetProductByIdAsync(5, Arg.Any<CancellationToken>());
        await repo.Received(1).AddAsync(Arg.Is<Product>(p => p.Name == "Produto Externo"), Arg.Any<CancellationToken>());
    }
}
