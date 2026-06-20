using FluentValidation;

namespace CleanStack.Application.Features.Products.Commands.UpdateProduct;

public sealed class UpdateProductValidator : AbstractValidator<UpdateProductCommand>
{
    public UpdateProductValidator()
    {
        _ = RuleFor(x => x.Id)
            .NotEmpty();

        _ = RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(120);

        _ = RuleFor(x => x.Description)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        _ = RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0);
    }
}
