using Boilerplate.Application;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsMediatR
{
    public static void RegisterBindings(IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(new AssemblyReference().GetAssembly()));
    }
}
