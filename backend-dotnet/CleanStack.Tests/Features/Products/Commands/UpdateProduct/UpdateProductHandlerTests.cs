using CleanStack.Application.Features.Products.Commands.UpdateProduct;
using CleanStack.CrossCutting.Dto.Products;
using CleanStack.Domain.Entities;
using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Domain.Interfaces.UnitOfWork;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using NSubstitute;

namespace CleanStack.Tests.Features.Products.Commands.UpdateProduct;

[Trait("Category", "Products")]
public class UpdateProductHandlerTests
{
    [Fact]
    public async Task Handle_ProdutoEncontrado_AtualizaERetornaDto()
    {
        var product = new Product
        {
            Id = 1,
            Name = "Antigo",
            Price = 5,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
        };

        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.GetByIdTrackingAsync(1, Arg.Any<CancellationToken>()).Returns(product);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        IValidator<UpdateProductCommand> validator = Substitute.For<IValidator<UpdateProductCommand>>();
        _ = validator.ValidateAsync(Arg.Any<UpdateProductCommand>(), Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        var handler = new UpdateProductHandler(uow, validator);
        var command = new UpdateProductCommand(1, "Novo nome", "Nova descrição", 99m, false);

        ProductDto? result = await handler.Handle(command, CancellationToken.None);

        _ = result.Should().NotBeNull();
        _ = result.Name.Should().Be("Novo nome");
        _ = result.Description.Should().Be("Nova descrição");
        _ = result.Price.Should().Be(99m);
        _ = result.IsActive.Should().BeFalse();
        _ = await uow.Received(1).SaveChangesAsync(Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Handle_ProdutoNaoEncontrado_RetornaNull()
    {
        IProductRepository repo = Substitute.For<IProductRepository>();
        _ = repo.GetByIdTrackingAsync(Arg.Any<long>(), Arg.Any<CancellationToken>())
            .Returns((Product?)null);

        IProductUnitOfWork uow = Substitute.For<IProductUnitOfWork>();
        _ = uow.ProductRepository.Returns(repo);

        IValidator<UpdateProductCommand> validator = Substitute.For<IValidator<UpdateProductCommand>>();
        _ = validator.ValidateAsync(Arg.Any<UpdateProductCommand>(), Arg.Any<CancellationToken>())
            .Returns(new ValidationResult());

        var handler = new UpdateProductHandler(uow, validator);
        ProductDto? result = await handler.Handle(new UpdateProductCommand(999, "Nome", null, 10m), CancellationToken.None);

        _ = result.Should().BeNull();
        _ = await uow.DidNotReceive().SaveChangesAsync(Arg.Any<CancellationToken>());
    }
}
