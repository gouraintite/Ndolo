using Ndolo.Api.Dtos.Centers;

namespace Ndolo.Api.Services;

public interface ICenterService
{
    Task<CenterListResponse> ListAsync(CenterListRequest request, CancellationToken ct = default);
    Task<CenterResponse?> GetAsync(Guid id, CancellationToken ct = default);
}
