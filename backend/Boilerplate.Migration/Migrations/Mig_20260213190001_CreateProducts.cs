using FluentMigrator;

namespace Boilerplate.Migration.Migrations;

[Migration(20260213190001)]
public sealed class Mig_20260213190001_CreateProducts : FluentMigrator.Migration
{
    public override void Up()
    {
        Create.Table("Products")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()
            .WithColumn("Name").AsString(120).NotNullable()
            .WithColumn("Description").AsString(1000).Nullable()
            .WithColumn("Price").AsDecimal(18, 2).NotNullable()
            .WithColumn("IsActive").AsBoolean().NotNullable()
            .WithColumn("CreatedAtUtc").AsDateTime().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Products");
    }
}
