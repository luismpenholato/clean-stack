using CleanStack.Domain.Interfaces.Services;
using CleanStack.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsServices
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddTransient<IExternalProductService, ExternalProductService>();
}
