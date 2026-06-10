using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Ndolo.Api.Data;

// Allows `dotnet ef migrations add` without a running DB or full DI
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseNpgsql(
                "Host=localhost;Port=5432;Database=ndolo_dev;Username=ndolo;Password=ndolo_secret",
                npgsql => npgsql.UseNetTopologySuite())
            .Options;
        return new ApplicationDbContext(options);
    }
}
