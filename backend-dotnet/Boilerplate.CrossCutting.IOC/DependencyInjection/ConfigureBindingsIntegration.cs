using Boilerplate.CrossCutting.Helpers;
using Boilerplate.CrossCutting.Options;
using Boilerplate.Domain.Interfaces.Integration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;

namespace Boilerplate.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsIntegration
{
    private static readonly TimeSpan DefaultHttpTimeout = TimeSpan.FromSeconds(30);

    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration)
    {
        var baseUrl = configuration.GetSection(ExternalProductApiOptions.SectionName)[nameof(ExternalProductApiOptions.BaseUrl)];

        _ = services.AddRefitClient<IExternalProductIntegration>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(UrlHelper.NormalizeBaseAddress(baseUrl));
                c.Timeout = DefaultHttpTimeout;
            })
            .AddStandardResilienceHandler();
    }
}
