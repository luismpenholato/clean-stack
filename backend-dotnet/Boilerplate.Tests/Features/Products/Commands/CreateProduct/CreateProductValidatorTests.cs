using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using FluentAssertions;
using FluentValidation.Results;

namespace Boilerplate.Tests.Features.Products.Commands.CreateProduct;

[Trait("Category", "Products")]
public class CreateProductValidatorTests
{
    private readonly CreateProductValidator _validator = new();

    [Fact]
    public void Validate_QuandoNomeVazio_DeveFalhar()
    {
        var command = new CreateProductCommand("", "Descrição", 10m, true, null);

        ValidationResult result = _validator.Validate(command);

        _ = result.IsValid.Should().BeFalse();
        _ = result.Errors.Should().Contain(e => e.PropertyName == nameof(CreateProductCommand.Name));
    }

    [Fact]
    public void Validate_QuandoImportFromExternalId_NaoExigeNome()
    {
        var command = new CreateProductCommand(null, null, null, true, 5);

        ValidationResult result = _validator.Validate(command);

        _ = result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void Validate_QuandoPrecoNegativo_DeveFalhar()
    {
        var command = new CreateProductCommand("Produto", null, -1m, true, null);

        ValidationResult result = _validator.Validate(command);

        _ = result.IsValid.Should().BeFalse();
        _ = result.Errors.Should().Contain(e => e.PropertyName == nameof(CreateProductCommand.Price));
    }
}
