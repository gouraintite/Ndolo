namespace Ndolo.Api.Models;

public class FeaturedRotation
{
    public Guid Id { get; set; }
    public Guid CenterId { get; set; }
    public Center? Center { get; set; }
    public DateOnly Date { get; set; }
    public double Score { get; set; }
}
