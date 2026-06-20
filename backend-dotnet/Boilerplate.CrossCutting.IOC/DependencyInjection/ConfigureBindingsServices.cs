using Boilerplate.Domain.Interfaces.Services;
using Boilerplate.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsServices
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddTransient<IExternalProductService, ExternalProductService>();
}
