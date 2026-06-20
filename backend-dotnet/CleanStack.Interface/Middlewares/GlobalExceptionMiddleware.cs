using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace CleanStack.Interface.Middlewares;

public sealed class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(ex, "Validation failed");
            await WriteProblemDetailsAsync(context, HttpStatusCode.BadRequest, "Erro de validação", FormatValidationErrors(ex));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Invalid operation");
            await WriteProblemDetailsAsync(context, HttpStatusCode.BadRequest, "Operação inválida", ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            await WriteProblemDetailsAsync(context, HttpStatusCode.InternalServerError, "Erro interno", "Ocorreu um erro inesperado. Tente novamente.");
        }
    }

    private static async Task WriteProblemDetailsAsync(HttpContext context, HttpStatusCode statusCode, string title, string detail)
    {
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/problem+json";

        var problem = new ProblemDetails
        {
            Status = (int)statusCode,
            Title = title,
            Detail = detail
        };

        await context.Response.WriteAsJsonAsync(problem);
    }

    private static string FormatValidationErrors(ValidationException ex)
    {
        IEnumerable<string> errors = ex.Errors
            .Select(e => e.ErrorMessage)
            .Distinct();

        return string.Join(" | ", errors);
    }
}
