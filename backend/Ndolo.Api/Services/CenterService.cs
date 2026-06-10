using Microsoft.EntityFrameworkCore;
using Ndolo.Api.Data;
using Ndolo.Api.Dtos.Centers;
using Ndolo.Api.Models;
using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Services;

public class CenterService(ApplicationDbContext db) : ICenterService
{
    public async Task<CenterListResponse> ListAsync(CenterListRequest request, CancellationToken ct = default)
    {
        var query = db.Centers.AsNoTracking()
            .Where(c => c.VerificationStatus != VerificationStatus.Suspended);

        query = request.Filter switch
        {
            "urgent" => query.Where(c => c.TrustLevel >= TrustLevel.L2), // placeholder until urgent flag added
            "certified" => query.Where(c => c.TrustLevel == TrustLevel.L3),
            "verified" => query.Where(c => c.TrustLevel >= TrustLevel.L2),
            _ => query
        };

        if (!string.IsNullOrWhiteSpace(request.Region))
            query = query.Where(c => c.Region == request.Region);

        var total = await query.CountAsync(ct);
        var items = await query
            .OrderByDescending(c => c.TrustLevel)
            .ThenBy(c => c.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => ToResponse(c))
            .ToListAsync(ct);

        return new CenterListResponse(items, total, request.Page, request.PageSize);
    }

    public async Task<CenterResponse?> GetAsync(Guid id, CancellationToken ct = default)
    {
        var c = await db.Centers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        return c is null ? null : ToResponse(c);
    }

    private static CenterResponse ToResponse(Center c) => new(
        c.Id,
        c.Name,
        c.Type.ToString(),
        c.Description,
        c.Region,
        TrustLevelLabel(c.TrustLevel),
        false,            // urgent flag — will come from cagnotte urgency in Sprint 4
        null, null,       // raised/goal — populated once cagnottes are wired
        null, null);

    private static string TrustLevelLabel(TrustLevel level) => level switch
    {
        TrustLevel.L0 => "unverified",
        TrustLevel.L1 => "unverified",
        TrustLevel.L2 => "verified",
        TrustLevel.L3 => "certified",
        _ => "unverified"
    };
}
