namespace Boilerplate.CrossCutting.Options;

public sealed class ExternalProductApiOptions
{
    public const string SectionName = "ExternalProductApi";

    public required string BaseUrl { get; init; }
}
