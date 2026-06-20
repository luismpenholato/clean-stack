using FluentValidation;

namespace CleanStack.Application.Features.Products.Commands.CreateProduct;

public sealed class CreateProductValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductValidator()
    {
        _ = RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(120)
            .When(x => !x.ImportFromExternalId.HasValue);

        _ = RuleFor(x => x.Description)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        _ = RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0)
            .When(x => !x.ImportFromExternalId.HasValue);
    }
}
