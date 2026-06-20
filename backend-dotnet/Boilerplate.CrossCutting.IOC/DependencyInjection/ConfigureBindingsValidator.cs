using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsValidator
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();
}
