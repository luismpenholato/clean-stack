using CleanStack.CrossCutting.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsOptions
{
    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration)
    {
        _ = services.Configure<ApiOptions>(c => configuration.GetSection(ApiOptions.SectionName).Bind(c));
        _ = services.Configure<ExternalProductApiOptions>(c => configuration.GetSection(ExternalProductApiOptions.SectionName).Bind(c));
    }
}
