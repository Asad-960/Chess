using System;
using Domain.IdentityEntities;
using Persistence.DTO;

namespace Persistence.ServiceContracts;

public interface IJwtService
{
    AuthenticationResponse GenerateToken(ApplicationUser user);
}
