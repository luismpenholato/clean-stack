namespace CleanStack.Interface.Extensions;

public static class SwaggerExtensions
{
    public static void AddSwagger(this IServiceCollection services)
    {
        _ = services.AddEndpointsApiExplorer();
        _ = services.AddSwaggerGen(options => options.SwaggerDoc("v1", new()
        {
            Title = "CleanStack API",
            Version = "v1",
            Description = "CleanStack API - .NET 10",
        }));
    }
}
