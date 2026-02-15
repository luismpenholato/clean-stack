using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using Boilerplate.Application.Features.Products.Commands.UpdateProduct;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsValidator
{
    public static void RegisterBindings(IServiceCollection services)
    {
        services.AddScoped<IValidator<CreateProductCommand>, CreateProductValidator>();
        services.AddScoped<IValidator<UpdateProductCommand>, UpdateProductValidator>();
    }
}
