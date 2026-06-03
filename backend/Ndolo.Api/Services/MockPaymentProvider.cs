namespace Ndolo.Api.Services;

public class MockPaymentProvider : IPaymentProvider
{
    public Task<PaymentInitResult> InitiateAsync(PaymentInitRequest request, CancellationToken ct = default)
    {
        var result = new PaymentInitResult(true, $"MOCK-{Guid.NewGuid():N}", null);
        return Task.FromResult(result);
    }

    public Task<bool> VerifyAsync(string providerRef, CancellationToken ct = default) =>
        Task.FromResult(true);
}
