using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace Boilerplate.Interface.Extensions;

public static class HealthCheckExtensions
{
    public static IEndpointRouteBuilder MapHealthCheckEndpoints(this IEndpointRouteBuilder endpoints)
    {
        _ = endpoints.MapHealthChecks("/live", new HealthCheckOptions { Predicate = _ => false });
        _ = endpoints.MapHealthChecks("/ready", new HealthCheckOptions { Predicate = c => c.Tags.Contains("ready") });
        _ = endpoints.MapHealthChecks("/startup", new HealthCheckOptions { Predicate = c => c.Tags.Contains("startup") });
        return endpoints;
    }
}
