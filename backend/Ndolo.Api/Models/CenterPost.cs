namespace Ndolo.Api.Models;

public class CenterPost
{
    public Guid Id { get; set; }
    public Guid CenterId { get; set; }
    public Center? Center { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public ICollection<string> MediaUrls { get; set; } = [];
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
}
