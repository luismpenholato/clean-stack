using CleanStack.Domain.Interfaces.Entities;

namespace CleanStack.Domain.Entities;

public sealed class Product : IEntity<long>
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
