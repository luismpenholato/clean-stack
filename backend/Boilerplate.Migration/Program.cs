using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.Migration;

internal static class Program
{
    private static void Main()
    {
        Console.WriteLine("===========================================");
        Console.WriteLine("Execucao Boilerplate.Migration");
        Console.WriteLine("===========================================");
        Console.WriteLine($"Working Dir.: {AppContext.BaseDirectory}");

        var configuration = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", true)
            .Build();

        var connection = configuration.GetConnectionString("Default");

        if (string.IsNullOrWhiteSpace(connection))
        {
            throw new Exception("Connection string nao encontrada.");
        }

        Console.WriteLine("===========================================");
        Console.WriteLine($"Connection: {connection}");
        Console.WriteLine("===========================================");

        var serviceProvider = CreateServices(connection);

        using var scope = serviceProvider.CreateScope();
        UpdateDatabase(scope.ServiceProvider);

        Console.WriteLine("Migration executado com sucesso.");
        Console.WriteLine("===========================================");
    }

    private static IServiceProvider CreateServices(string connection)
    {
        return new ServiceCollection()
            .AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSqlServer()
                .WithGlobalConnectionString(connection)
                .ScanIn(typeof(Program).Assembly).For.Migrations())
            .AddLogging(lb => lb.AddFluentMigratorConsole())
            .BuildServiceProvider(false);
    }

    private static void UpdateDatabase(IServiceProvider serviceProvider)
    {
        var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
        runner.ListMigrations();
        runner.MigrateUp();
    }
}
