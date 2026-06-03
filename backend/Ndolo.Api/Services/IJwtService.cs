using Ndolo.Api.Models;

namespace Ndolo.Api.Services;

public interface IJwtService
{
    string GenerateToken(User user, IList<string> roles);
}
