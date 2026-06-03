namespace Ndolo.Api.Dtos.Auth;

public record LoginResponse(Guid UserId, string Email, IList<string> Roles, string Token);
