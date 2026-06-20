using CleanStack.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsHealthChecks
{
    public static void RegisterBindings(IServiceCollection services)
    {
        _ = services.AddHealthChecks()
            .AddDbContextCheck<AppDbContext>("DbContext", HealthStatus.Unhealthy, ["ready", "startup"]);
    }
}
