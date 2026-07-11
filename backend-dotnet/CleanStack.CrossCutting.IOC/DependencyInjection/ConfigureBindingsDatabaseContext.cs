using CleanStack.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsDatabaseContext
{
    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration)
    {
        string? provider = configuration.GetValue<string>("Database:Provider")?.Trim();
        string? connectionString = configuration.GetConnectionString("Default");

        if (string.Equals(provider, "InMemory", StringComparison.OrdinalIgnoreCase))
        {
            _ = services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("CleanStackDb"));
            return;
        }

        if (string.Equals(provider, "SqlServer", StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace(provider))
        {
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("ConnectionStrings:Default não configurada.");
            }

            _ = services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
            return;
        }

        throw new InvalidOperationException($"Database:Provider inválido: {provider}.");
    }
}
