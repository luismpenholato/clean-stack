using CleanStack.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanStack.Infrastructure.Persistence.Map;

public class ProductEntityConfig : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        _ = builder.HasKey(p => p.Id);
        _ = builder.Property(p => p.Id).ValueGeneratedOnAdd();
        _ = builder.Property(p => p.Name).HasMaxLength(120).IsRequired();
        _ = builder.Property(p => p.Description).HasMaxLength(1000);
        _ = builder.Property(p => p.Price).HasPrecision(18, 2);
    }
}
