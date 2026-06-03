using Microsoft.AspNetCore.Identity;
using Ndolo.Api.Dtos.Auth;
using Ndolo.Api.Models;
using Ndolo.Api.Models.Enums;

namespace Ndolo.Api.Services;

public class AuthService(
    UserManager<User> userManager,
    IJwtService jwtService) : IAuthService
{
    public async Task<LoginResponse> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        var user = new User
        {
            UserName = request.Email,
            Email = request.Email,
            Phone = request.Phone,
            Locale = request.Locale ?? "fr"
        };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));

        await userManager.AddToRoleAsync(user, UserRoles.Donor);
        var roles = await userManager.GetRolesAsync(user);
        var token = jwtService.GenerateToken(user, roles);

        return new LoginResponse(user.Id, user.Email!, roles, token);
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await userManager.FindByEmailAsync(request.Email)
            ?? throw new InvalidOperationException("Invalid credentials.");

        if (!await userManager.CheckPasswordAsync(user, request.Password))
            throw new InvalidOperationException("Invalid credentials.");

        var roles = await userManager.GetRolesAsync(user);
        var token = jwtService.GenerateToken(user, roles);

        return new LoginResponse(user.Id, user.Email!, roles, token);
    }
}
