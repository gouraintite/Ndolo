using Microsoft.Extensions.Logging;

namespace Ndolo.Api.Services;

public class MockNotificationService(ILogger<MockNotificationService> logger) : INotificationService
{
    public Task SendAsync(NotificationMessage message, CancellationToken ct = default)
    {
        logger.LogInformation("[MOCK NOTIFICATION] To={Recipient} Subject={Subject} SMS={IsSms}",
            message.Recipient, message.Subject, message.IsSms);
        return Task.CompletedTask;
    }
}
