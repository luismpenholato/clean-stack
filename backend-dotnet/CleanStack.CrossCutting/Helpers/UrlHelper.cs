namespace CleanStack.CrossCutting.Helpers;

public static class UrlHelper
{
    public static string NormalizeBaseAddress(string? baseUrl)
    {
        string trimmed = (baseUrl ?? string.Empty).Trim().TrimEnd('/');
        return string.IsNullOrEmpty(trimmed) ? "/" : trimmed + "/";
    }
}
