using CleanStack.CrossCutting.Helpers;
using CleanStack.CrossCutting.Options;
using CleanStack.Domain.Interfaces.Integration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsIntegration
{
    private static readonly TimeSpan DefaultHttpTimeout = TimeSpan.FromSeconds(30);

    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration)
    {
        string? baseUrl = configuration.GetSection(ExternalProductApiOptions.SectionName)[nameof(ExternalProductApiOptions.BaseUrl)];

        _ = services.AddRefitClient<IExternalProductIntegration>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(UrlHelper.NormalizeBaseAddress(baseUrl));
                c.Timeout = DefaultHttpTimeout;
            })
            .AddStandardResilienceHandler();
    }
}
