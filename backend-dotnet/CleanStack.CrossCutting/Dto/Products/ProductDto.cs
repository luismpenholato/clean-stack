namespace CleanStack.CrossCutting.Dto.Products;

public sealed record ProductDto
{
    public long Id { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public decimal Price { get; init; }
    public bool IsActive { get; init; }
    public DateTime CreatedAtUtc { get; init; }
}
