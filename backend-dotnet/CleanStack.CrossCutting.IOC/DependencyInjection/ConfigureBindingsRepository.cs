using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsRepository
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddScoped<IProductRepository, ProductRepository>();
}
