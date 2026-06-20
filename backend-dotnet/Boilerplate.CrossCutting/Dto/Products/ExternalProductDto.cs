namespace Boilerplate.CrossCutting.Dto.Products;

public sealed record ExternalProductDto
{
    public int Id { get; init; }
    public required string Title { get; init; }
    public decimal Price { get; init; }
    public string? Description { get; init; }
    public string? Category { get; init; }
    public string? Image { get; init; }
}
