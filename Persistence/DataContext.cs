using Domain;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<ChessGame> Games { get; set; }
    }

}
