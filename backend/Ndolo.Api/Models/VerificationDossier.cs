using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Models;

public class VerificationDossier
{
    public Guid Id { get; set; }
    public Guid CenterId { get; set; }
    public Center? Center { get; set; }
    public VerificationStatus Status { get; set; } = VerificationStatus.Draft;
    public DateTime SubmittedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public Guid? ReviewedById { get; set; }
    public string? ModeratorNote { get; set; }

    public ICollection<AutoSignal> AutoSignals { get; set; } = [];
    public ICollection<DossierDocument> Documents { get; set; } = [];
}

public class AutoSignal
{
    public Guid Id { get; set; }
    public Guid DossierId { get; set; }
    public VerificationDossier? Dossier { get; set; }
    public SignalKind Kind { get; set; }
    public SignalResult Result { get; set; }
    public string Detail { get; set; } = string.Empty;
}

public class DossierDocument
{
    public Guid Id { get; set; }
    public Guid DossierId { get; set; }
    public VerificationDossier? Dossier { get; set; }
    public string Url { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}
