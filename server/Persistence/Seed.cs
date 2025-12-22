using Domain;
namespace Persistence
{
    public class DbInitializer
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Games.Any()) return;
            var games = new List<ChessGame>
            {
                
                new()
                {
                    Player1 = "Isaac",
                    Player2 = "Julia",
                    Moves = new List<string>
                    {
                        "e4", "e6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Nf3", "Ngf6", "Nxf6+", "Nxf6", "Bd3", "c5", "dxc5",
                        "Bxc5", "O-O", "O-O", "Bg5", "h6", "Bh4", "b6", "Qe2", "Bb7", "Rad1", "Qe7", "Ne5", "Rfd8", "Ng4", "Rd5",
                        "Bxf6", "gxf6", "Nxh6+", "Kg7", "Nf5+", "Rxf5", "Bxf5", "exf5", "Qxe7", "Bxe7", "Rd7", "Bc6", "Rc7", "Be4",
                        "f3", "Bd5", "Rd1", "Be6", "c3", "b5", "b4", "Kf8", "Kf2", "a5", "a3", "axb4", "axb4", "Ra2+", "Kg3", "Rc2",
                        "Rd3", "Ke8", "Ra7", "f4+", "Kxf4", "Bd8", "h4", "Rxg2", "Ra8", "Rh2", "Rexd8+", "Ke7", "Re8+", "Kd7", "Rad8#"
                    },
                    Date = DateTime.Now.AddMonths(4)
                } // French Defense Checkmate
            };
        
            await context.Games.AddRangeAsync(games);
            await context.SaveChangesAsync();
        }
    }
}