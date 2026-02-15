using Boilerplate.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsHealthChecks
{
    public static void RegisterBindings(IServiceCollection services)
    {
        services.AddHealthChecks()
            .AddDbContextCheck<AppDbContext>("DbContext", HealthStatus.Unhealthy, new[] { "ready", "startup" });
    }
}
