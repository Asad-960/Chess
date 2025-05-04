using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationService(builder.Configuration);

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

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

app.Run();
