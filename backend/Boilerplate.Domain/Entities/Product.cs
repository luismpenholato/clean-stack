using Boilerplate.Domain.Interfaces.Entities;

namespace Boilerplate.Domain.Entities;

public sealed class Product : IEntity
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
