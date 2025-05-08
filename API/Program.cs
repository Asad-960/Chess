using API.Extensions;
using API.Hubs;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationService(builder.Configuration);

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("https://chess-356b38.netlify.app/"));

app.UseAuthentication();
app.UseAuthorization();


using var scope = app.Services.CreateScope();  // Creates a DI scope
var services = scope.ServiceProvider;         // Get the service provider

try
{
    var context = services.GetRequiredService<DataContext>(); // Resolve DataContext
    await context.Database.MigrateAsync();  // Apply migrations // dotnet ef database update
    await DbInitializer.SeedData(context);  // Seed database
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();   
    logger.LogError(ex, "Error");  
}

app.MapControllers();
app.MapHub<GameHub>("/online");

app.Run();
