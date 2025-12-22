using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.IdentityEntities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence.DTO;
using Persistence.ServiceContracts;

namespace Persistence.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration; 
    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public AuthenticationResponse GenerateToken(ApplicationUser user)
    {
        var issuedAt = DateTime.UtcNow;
        DateTime expiration = issuedAt.AddMinutes(Convert.ToDouble(_configuration["Jwt:Expiration"]));   
        Claim[] claims =
        [
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.Iat, new DateTimeOffset(issuedAt).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new(ClaimTypes.Name, user.UserName ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user.Email ?? "")
        ];

        SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? ""));
        
        SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken tokenGenerator = new(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: expiration,
            signingCredentials: signingCredentials
        );

        JwtSecurityTokenHandler tokenHandler = new();
        tokenHandler.WriteToken(tokenGenerator);

        AuthenticationResponse response = new()
        {
            Token = tokenHandler.WriteToken(tokenGenerator),
            Expiration = expiration,
            Name = user.UserName,
            Email = user.Email 
        };
        return response;
    }
}
