using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Models;

public class Cagnotte
{
    public Guid Id { get; set; }
    public Guid CenterId { get; set; }
    public Center? Center { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty;
    public decimal GoalAmount { get; set; }
    public string Currency { get; set; } = "XAF";
    public decimal RaisedAmount { get; set; }
    public CagnotteStatus Status { get; set; } = CagnotteStatus.Draft;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ClosedAt { get; set; }

    public ICollection<Milestone> Milestones { get; set; } = [];
    public ICollection<Donation> Donations { get; set; } = [];
}

public class Milestone
{
    public Guid Id { get; set; }
    public Guid CagnotteId { get; set; }
    public Cagnotte? Cagnotte { get; set; }
    public int Order { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public UnlockStatus UnlockStatus { get; set; } = UnlockStatus.Locked;

    public ProofOfUse? Proof { get; set; }
}

public class ProofOfUse
{
    public Guid Id { get; set; }
    public Guid MilestoneId { get; set; }
    public Milestone? Milestone { get; set; }
    public ICollection<string> MediaUrls { get; set; } = [];
    public string Note { get; set; } = string.Empty;
    public string ReviewStatus { get; set; } = "Pending";
    public Guid? ReviewedById { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
