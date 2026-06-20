using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsRepository
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddScoped<IProductRepository, ProductRepository>();
}
