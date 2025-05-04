using System.Text;
using API.Services;
using Application.Chess.Commands;
using Domain.IdentityEntities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using Persistence.ServiceContracts;
using Persistence.Services;

namespace API.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(option => option.UseSqlite(configuration.GetConnectionString("DefaultConnection")));
        services.AddControllers();
        services.AddSingleton<IChessGameService, ChessGameService>();
        services.AddSingleton<ChessClockService>();
        services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetMoveValidity.Handler>());
        
        services.AddCors();
        
        services.AddTransient<IJwtService, JwtService>();
        
        
            

        services
            .AddIdentity<ApplicationUser, ApplicationRole>(options => {
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredUniqueChars = 3;

            })
            .AddDefaultTokenProviders()
            .AddEntityFrameworkStores<DataContext>()
            .AddUserStore<UserStore<ApplicationUser, ApplicationRole, DataContext, Guid>>()
            .AddRoleStore<RoleStore<ApplicationRole, DataContext, Guid>>();
        
        
        services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = 
            JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = 
            JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options => {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? ""))
            };
        });
        
        services.AddAuthorization();
        
        return services;
    }
}