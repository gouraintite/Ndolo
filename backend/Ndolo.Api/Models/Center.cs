using NetTopologySuite.Geometries;
using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Models;

public class Center
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public CenterType Type { get; set; }
    public string Description { get; set; } = string.Empty;
    public Point? GeoLocation { get; set; }
    public string Region { get; set; } = string.Empty;
    public TrustLevel TrustLevel { get; set; } = TrustLevel.L0;
    public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.Draft;
    public Guid? ManagerId { get; set; }
    public User? Manager { get; set; }
    public Guid CreatedById { get; set; }
    public User? CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastFeaturedAt { get; set; }

    public ICollection<CenterPost> Posts { get; set; } = [];
    public ICollection<Cagnotte> Cagnottes { get; set; } = [];
    public ICollection<VerificationDossier> Dossiers { get; set; } = [];
}
