using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Services;

public record PaymentInitRequest(Guid DonationId, decimal Amount, string Currency, DonationChannel Channel, string PhoneOrCard);
public record PaymentInitResult(bool Success, string ProviderRef, string? ErrorMessage);

public interface IPaymentProvider
{
    Task<PaymentInitResult> InitiateAsync(PaymentInitRequest request, CancellationToken ct = default);
    Task<bool> VerifyAsync(string providerRef, CancellationToken ct = default);
}
