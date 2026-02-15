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
using Xunit;

namespace Boilerplate.Tests.Features.Products.Commands.CreateProduct;

[Trait("Category", "Products")]
public class CreateProductHandlerTests
{
    [Fact]
    public async Task Handle_CommandValido_RetornaProductDto()
    {
        var uow = Substitute.For<IProductUnitOfWork>();
        var repo = Substitute.For<IProductRepository>();
        uow.ProductRepository.Returns(repo);

        var validator = Substitute.For<IValidator<CreateProductCommand>>();
        validator.ValidateAsync(Arg.Any<CreateProductCommand>(), Arg.Any<CancellationToken>()).Returns(Task.FromResult(new ValidationResult()));

        var externalProductService = Substitute.For<IExternalProductService>();

        var handler = new CreateProductHandler(uow, validator, externalProductService);
        var command = new CreateProductCommand("Produto Teste", "Descrição", 10.50m, true, null);

        var result = await handler.Handle(command, CancellationToken.None);

        result.Should().NotBeNull();
        result.Name.Should().Be("Produto Teste");
        result.Description.Should().Be("Descrição");
        result.Price.Should().Be(10.50m);
        result.IsActive.Should().BeTrue();
        result.Id.Should().BeGreaterThanOrEqualTo(0);
        await repo.Received(1).AddAsync(Arg.Is<Product>(p => p.Name == "Produto Teste"), Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ImportFromExternalId_PreencheDadosDaIntegracao()
    {
        var uow = Substitute.For<IProductUnitOfWork>();
        var repo = Substitute.For<IProductRepository>();
        uow.ProductRepository.Returns(repo);

        var validator = Substitute.For<IValidator<CreateProductCommand>>();
        validator.ValidateAsync(Arg.Any<CreateProductCommand>(), Arg.Any<CancellationToken>()).Returns(Task.FromResult(new ValidationResult()));

        var externalProductService = Substitute.For<IExternalProductService>();
        externalProductService.GetProductByIdAsync(5, Arg.Any<CancellationToken>()).Returns(new ExternalProductDto
        {
            Id = 5,
            Title = "Produto Externo",
            Description = "Desc externa",
            Price = 99.90m
        });

        var handler = new CreateProductHandler(uow, validator, externalProductService);
        var command = new CreateProductCommand(null, null, null, true, 5);

        var result = await handler.Handle(command, CancellationToken.None);

        result.Should().NotBeNull();
        result.Name.Should().Be("Produto Externo");
        result.Description.Should().Be("Desc externa");
        result.Price.Should().Be(99.90m);
        await externalProductService.Received(1).GetProductByIdAsync(5, Arg.Any<CancellationToken>());
        await repo.Received(1).AddAsync(Arg.Is<Product>(p => p.Name == "Produto Externo"), Arg.Any<CancellationToken>());
    }
}
