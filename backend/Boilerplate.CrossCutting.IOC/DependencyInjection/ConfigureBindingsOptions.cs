using Boilerplate.CrossCutting.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsOptions
{
    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApiOptions>(c => configuration.GetSection(ApiOptions.SectionName).Bind(c));
        services.Configure<ExternalProductApiOptions>(c => configuration.GetSection(ExternalProductApiOptions.SectionName).Bind(c));
    }
}
