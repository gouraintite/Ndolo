using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Dtos.Centers;

public record CenterResponse(
    Guid Id,
    string Name,
    string Type,
    string Description,
    string Region,
    string TrustLevel,
    bool IsUrgent,
    decimal? RaisedAmount,
    decimal? GoalAmount,
    string? ActiveCagnotteId,
    string? ActiveCagnotteTitle);

public record CenterListResponse(
    IReadOnlyList<CenterResponse> Items,
    int TotalCount,
    int Page,
    int PageSize);

public record CenterListRequest(
    string? Filter = null,   // "urgent" | "certified" | "verified"
    string? Region = null,
    int Page = 1,
    int PageSize = 12);
