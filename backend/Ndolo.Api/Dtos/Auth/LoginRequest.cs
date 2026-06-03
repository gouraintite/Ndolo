using System.ComponentModel.DataAnnotations;

namespace Ndolo.Api.Dtos.Auth;

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);
