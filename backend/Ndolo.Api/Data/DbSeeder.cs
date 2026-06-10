using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ndolo.Api.Models;
using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

        await db.Database.MigrateAsync();

        // Seed roles
        foreach (var role in new[] { UserRoles.Admin, UserRoles.Moderator, UserRoles.CenterManager, UserRoles.Contributor, UserRoles.Donor })
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
        }

        // Seed admin user
        if (await userManager.FindByEmailAsync("admin@ndolo.cm") is null)
        {
            var admin = new User { UserName = "admin@ndolo.cm", Email = "admin@ndolo.cm", Locale = "fr", EmailConfirmed = true };
            await userManager.CreateAsync(admin, "Admin@1234!");
            await userManager.AddToRoleAsync(admin, UserRoles.Admin);
        }

        // Seed mock centers (dev only)
        if (!await db.Centers.AnyAsync())
        {
            var adminUser = await userManager.FindByEmailAsync("admin@ndolo.cm");
            var centers = new[]
            {
                new Center { Name = "Les Graines d'Avenir", Type = CenterType.Orphanage, Description = "Orphelinat accueillant des enfants en zone périurbaine de Douala.", Region = "Littoral", TrustLevel = TrustLevel.L3, VerificationStatus = VerificationStatus.Verified, CreatedById = adminUser!.Id },
                new Center { Name = "Le Bercail des Anges", Type = CenterType.Charity, Description = "Association d'aide aux enfants vulnérables de Yaoundé.", Region = "Centre", TrustLevel = TrustLevel.L2, VerificationStatus = VerificationStatus.Verified, CreatedById = adminUser!.Id },
                new Center { Name = "Foyer Kibodi", Type = CenterType.Orphanage, Description = "Foyer familial dans l'Ouest-Cameroun, accompagnement scolaire et professionnel.", Region = "Ouest", TrustLevel = TrustLevel.L2, VerificationStatus = VerificationStatus.Verified, CreatedById = adminUser!.Id },
                new Center { Name = "Association Aurore", Type = CenterType.AidCenter, Description = "Centre d'aide aux familles en détresse dans le Grand Nord.", Region = "Nord", TrustLevel = TrustLevel.L3, VerificationStatus = VerificationStatus.Verified, CreatedById = adminUser!.Id },
                new Center { Name = "Centre Les Palmiers", Type = CenterType.Orphanage, Description = "Orphelinat côtier nouvellement déclaré, en cours de vérification.", Region = "Sud", TrustLevel = TrustLevel.L0, VerificationStatus = VerificationStatus.Draft, CreatedById = adminUser!.Id },
                new Center { Name = "Maison Ndolo Bell", Type = CenterType.Charity, Description = "Association de soutien aux enfants orphelins du quartier Bell à Limbé.", Region = "Sud-Ouest", TrustLevel = TrustLevel.L3, VerificationStatus = VerificationStatus.Verified, CreatedById = adminUser!.Id },
            };
            db.Centers.AddRange(centers);
            await db.SaveChangesAsync();
        }
    }
}
