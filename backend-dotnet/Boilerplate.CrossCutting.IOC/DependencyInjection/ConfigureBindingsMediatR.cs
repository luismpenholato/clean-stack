using Boilerplate.Application;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsMediatR
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(new AssemblyReference().GetAssembly()));
}
