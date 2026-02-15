using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace Boilerplate.Interface.Extensions;

public static class HealthCheckExtensions
{
    public static IEndpointRouteBuilder MapHealthCheckEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapHealthChecks("/live", new HealthCheckOptions { Predicate = _ => false });
        endpoints.MapHealthChecks("/ready", new HealthCheckOptions { Predicate = c => c.Tags.Contains("ready") });
        endpoints.MapHealthChecks("/startup", new HealthCheckOptions { Predicate = c => c.Tags.Contains("startup") });
        return endpoints;
    }
}
