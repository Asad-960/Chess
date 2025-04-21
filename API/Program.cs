using API.Services;
using Application.Chess.Commands;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<IChessGameService, ChessGameService>();
builder.Services.AddSingleton<ChessClockService>();
builder.Services.AddDbContext<DataContext>(option => 
{
    option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetMoveValidity.Handler>());
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "http://localhost:3000"));


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
