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
                    Player1 = "Alice",
                    Player2 = "Bob",
                    Moves = new List<string>
                    {
                        "e4", "e5", "Qh5", "Nc6", "Bc4", "Nf6", "Qxf7#"
                    },
                    Date = DateTime.Now.AddMonths(-1),
                    MovesPlayed = 7
                }, // Fool's Mate
                new()
                {
                    Player1 = "Charlie",
                    Player2 = "David",
                    Moves = new List<string>
                    {
                        "e4", "e5", "Nf3", "d6", "d4", "Bg4", "dxe5", "Bxf3", "Qxf3", "dxe5", "Bc4", "Nf6", "Qb3", "Qe7", "Nc3", "c6",
                        "Bg5", "b5", "Nxb5", "cxb5", "Bxb5+", "Nbd7", "O-O-O", "Rd8", "Rxd7", "Rxd7", "Rd1", "Qd8", "Bxd7+", "Qxd7",
                        "Rxd7", "Kxd7", "Bxf6", "gxf6", "Qxf6", "Rg8", "Qxf7+", "Kd8", "Rd1+", "Kc8", "Qd7#",
                    },
                    Date = DateTime.Now.AddMonths(1)
                }, // Legal's Mate
                new()
                {
                    Player1 = "Eve",
                    Player2 = "Frank",
                    Moves = new List<string>
                    {
                        "e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O",
                        "h3", "Nb8", "d4", "Nbd7", "c4", "Bb7", "Nc3", "c6", "a3", "Qc7", "Ba2", "Rfe8", "Be3", "Bf8", "Rc1", "h6",
                        "Qd2", "Rad8", "cxb5", "axb5", "Nxb5", "cxb5", "Rxc7", "Bxe4", "dxe5", "Nxe5", "Nxe5", "dxe5", "Bxf7+", "Kxf7",
                        "Qxd8", "Rxd8", "Rc1", "Rd7", "f3", "Bd5", "Red1", "Ke6", "Kf2", "Bd6", "Rc8", "Bb7", "Rc2", "Nd5", "Bc5", "Rc7",
                        "Bxd6", "Rxd6", "Rdc8", "Rxc8", "Rxc8", "Kd7", "Rg8", "g5", "Rg6", "Nf4", "Rxh6", "Nd3+", "Ke3", "Nf4",
                        "Ke4", "Nxg2", "Kxe5", "Nh4", "f4", "gxf4", "Kxf4", "Ng6+", "Rxg6", "Bxg6", "Kg5", "Bd3", "h4", "Ke7", "h5",
                        "Kf7", "Kh6", "Bc2", "b4", "Ke6", "b5", "Kd7", "b6", "Kc8", "a4", "Kb7", "a5", "Ka6", "b7", "Ka5", "b8=Q",
                        "Ka4", "Qb2#",
                    },
                    Date = DateTime.Now.AddMonths(2)
                }, // Ruy Lopez Checkmate
                new()
                {
                    Player1 = "George",
                    Player2 = "Hannah",
                    Moves = new List<string>
                    {
                        "f3", "e5", "g4", "Qh4#"
                    },
                    Date = DateTime.Now.AddMonths(3)
                }, // Fool's Mate
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