using CleanStack.CrossCutting.IOC.DependencyInjection;
using CleanStack.Interface.Extensions;
using CleanStack.Interface.Middlewares;
using Serilog;

public partial class Program
{
    private static async Task Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

        try
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            _ = builder.Host.UseSerilog((context, services, configuration) => configuration
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services)
                .Enrich.FromLogContext()
                .WriteTo.Console());

            _ = builder.Services.AddControllers();
            ConfigureBindingsDependencyInjection.RegisterBindings(builder.Services, builder.Configuration);

            builder.Services.AddSwagger();

            _ = builder.Services.AddCors(options => options.AddPolicy("AllowFrontend", policy =>
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()));

            WebApplication app = builder.Build();

            _ = app.UseMiddleware<GlobalExceptionMiddleware>();
            _ = app.UseSerilogRequestLogging();

            if (!app.Environment.IsDevelopment())
            {
                _ = app.UseHttpsRedirection();
            }

            _ = app.UseCors("AllowFrontend");

            _ = app.UseSwagger();
            _ = app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CleanStack API v1"));

            _ = app.MapControllers();
            _ = app.MapHealthCheckEndpoints();

            app.Run();
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Aplicação encerrada inesperadamente");
        }
        finally
        {
            await Log.CloseAndFlushAsync();
        }
    }
}
