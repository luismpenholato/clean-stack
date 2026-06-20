using Boilerplate.Domain.Interfaces.UnitOfWork;
using Boilerplate.Infrastructure.Persistence.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsUnitOfWork
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddScoped<IProductUnitOfWork, ProductUnitOfWork>();
}
