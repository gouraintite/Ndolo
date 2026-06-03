using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Models;

public class Donation
{
    public Guid Id { get; set; }
    public Guid CagnotteId { get; set; }
    public Cagnotte? Cagnotte { get; set; }
    public Guid? DonorId { get; set; }
    public User? Donor { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "XAF";
    public DonationChannel Channel { get; set; }
    public string ProviderRef { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public bool Anonymous { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
