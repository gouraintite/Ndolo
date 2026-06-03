using Microsoft.AspNetCore.Identity;

namespace Ndolo.Api.Models;

public class User : IdentityUser<Guid>
{
    public string? Phone { get; set; }
    public string Locale { get; set; } = "fr";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Center> ManagedCenters { get; set; } = [];
    public ICollection<Donation> Donations { get; set; } = [];
}
