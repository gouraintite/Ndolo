using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ndolo.Api.Models;

namespace Ndolo.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<User, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<Center> Centers => Set<Center>();
    public DbSet<VerificationDossier> VerificationDossiers => Set<VerificationDossier>();
    public DbSet<AutoSignal> AutoSignals => Set<AutoSignal>();
    public DbSet<DossierDocument> DossierDocuments => Set<DossierDocument>();
    public DbSet<CenterPost> CenterPosts => Set<CenterPost>();
    public DbSet<Cagnotte> Cagnottes => Set<Cagnotte>();
    public DbSet<Milestone> Milestones => Set<Milestone>();
    public DbSet<ProofOfUse> ProofsOfUse => Set<ProofOfUse>();
    public DbSet<Donation> Donations => Set<Donation>();
    public DbSet<Report> Reports => Set<Report>();
    public DbSet<FeaturedRotation> FeaturedRotations => Set<FeaturedRotation>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasPostgresExtension("postgis");

        builder.Entity<Center>(e =>
        {
            e.Property(c => c.TrustLevel).HasConversion<string>();
            e.Property(c => c.Type).HasConversion<string>();
            e.Property(c => c.VerificationStatus).HasConversion<string>();
            e.Property(c => c.GeoLocation).HasColumnType("geometry(Point, 4326)");
            e.HasOne(c => c.Manager).WithMany(u => u.ManagedCenters).HasForeignKey(c => c.ManagerId).OnDelete(DeleteBehavior.SetNull);
            e.HasOne(c => c.CreatedBy).WithMany().HasForeignKey(c => c.CreatedById).OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Cagnotte>(e =>
        {
            e.Property(c => c.Status).HasConversion<string>();
            e.Property(c => c.GoalAmount).HasPrecision(18, 2);
            e.Property(c => c.RaisedAmount).HasPrecision(18, 2);
        });

        builder.Entity<Milestone>(e =>
        {
            e.Property(m => m.UnlockStatus).HasConversion<string>();
            e.Property(m => m.Amount).HasPrecision(18, 2);
        });

        builder.Entity<Donation>(e =>
        {
            e.Property(d => d.Channel).HasConversion<string>();
            e.Property(d => d.Amount).HasPrecision(18, 2);
        });

        builder.Entity<VerificationDossier>(e =>
        {
            e.Property(v => v.Status).HasConversion<string>();
        });

        builder.Entity<AutoSignal>(e =>
        {
            e.Property(s => s.Kind).HasConversion<string>();
            e.Property(s => s.Result).HasConversion<string>();
        });

        builder.Entity<CenterPost>(e =>
        {
            e.Property(p => p.MediaUrls)
                .HasColumnType("text[]");
        });

        builder.Entity<ProofOfUse>(e =>
        {
            e.Property(p => p.MediaUrls)
                .HasColumnType("text[]");
        });

        builder.Entity<FeaturedRotation>(e =>
        {
            e.HasIndex(f => f.Date).IsUnique();
        });
    }
}
