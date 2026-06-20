using CleanStack.Application;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsMediatR
{
    public static void RegisterBindings(IServiceCollection services) => _ = services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(new AssemblyReference().GetAssembly()));
}
