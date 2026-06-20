namespace Boilerplate.Interface.Extensions;

public static class SwaggerExtensions
{
    public static void AddSwagger(this IServiceCollection services)
    {
        _ = services.AddEndpointsApiExplorer();
        _ = services.AddSwaggerGen(options => options.SwaggerDoc("v1", new()
        {
            Title = "Boilerplate API",
            Version = "v1",
            Description = "API Boilerplate - .NET 10",
        }));
    }
}
