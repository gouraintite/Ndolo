using System.ComponentModel.DataAnnotations;

namespace Ndolo.Api.Dtos.Auth;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password,
    string? Phone,
    string? Locale);
