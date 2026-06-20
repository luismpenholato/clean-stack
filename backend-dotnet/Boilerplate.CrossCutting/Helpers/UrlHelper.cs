namespace Boilerplate.CrossCutting.Helpers;

public static class UrlHelper
{
    public static string NormalizeBaseAddress(string? baseUrl)
    {
        var trimmed = (baseUrl ?? string.Empty).Trim().TrimEnd('/');
        return string.IsNullOrEmpty(trimmed) ? "/" : trimmed + "/";
    }
}
