namespace Ndolo.Api.Services;

public record NotificationMessage(string Recipient, string Subject, string Body, bool IsSms = false);

public interface INotificationService
{
    Task SendAsync(NotificationMessage message, CancellationToken ct = default);
}
