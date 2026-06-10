using Microsoft.AspNetCore.Mvc;
using Ndolo.Api.Dtos.Centers;
using Ndolo.Api.Services;

namespace Ndolo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CentersController(ICenterService centerService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(CenterListResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> List([FromQuery] CenterListRequest request, CancellationToken ct)
    {
        var result = await centerService.ListAsync(request, ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(CenterResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    {
        var result = await centerService.GetAsync(id, ct);
        return result is null ? NotFound() : Ok(result);
    }
}
