using Microsoft.Extensions.Logging;

namespace Ndolo.Api.Services;

public class MockStorageProvider(ILogger<MockStorageProvider> logger) : IStorageProvider
{
    public Task<string> UploadAsync(Stream content, string fileName, string contentType, CancellationToken ct = default)
    {
        var url = $"https://mock-storage.ndolo.local/{Guid.NewGuid():N}/{fileName}";
        logger.LogInformation("[MOCK STORAGE] Uploaded {FileName} → {Url}", fileName, url);
        return Task.FromResult(url);
    }

    public Task DeleteAsync(string url, CancellationToken ct = default)
    {
        logger.LogInformation("[MOCK STORAGE] Deleted {Url}", url);
        return Task.CompletedTask;
    }
}
