using Boilerplate.Application.Features.Products.Commands.UpdateProduct;
using FluentAssertions;
using FluentValidation.Results;

namespace Boilerplate.Tests.Features.Products.Commands.UpdateProduct;

[Trait("Category", "Products")]
public class UpdateProductValidatorTests
{
    private readonly UpdateProductValidator _validator = new();

    [Fact]
    public void Validate_QuandoNomeVazio_DeveFalhar()
    {
        var command = new UpdateProductCommand(1, "", null, 10m, true);

        ValidationResult result = _validator.Validate(command);

        _ = result.IsValid.Should().BeFalse();
        _ = result.Errors.Should().Contain(e => e.PropertyName == nameof(UpdateProductCommand.Name));
    }

    [Fact]
    public void Validate_QuandoCommandValido_DevePassar()
    {
        var command = new UpdateProductCommand(1, "Produto", "Descrição", 10m, true);

        ValidationResult result = _validator.Validate(command);

        _ = result.IsValid.Should().BeTrue();
    }
}
