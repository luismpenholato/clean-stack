using CleanStack.Domain.Interfaces.UnitOfWork;
using CleanStack.Infrastructure.Persistence.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsUnitOfWork
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddScoped<IProductUnitOfWork, ProductUnitOfWork>();
}
