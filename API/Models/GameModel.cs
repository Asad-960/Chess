using Application.Chess.Moves;
using Application.Chess.Rules;

namespace API.Models
{
    public class GameModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<List<string>> Board { get; set; } = new List<List<string>>()
        {
            new() { "r", "n", "b", "q", "k", "b", "n", "r" },
            new() { "p", "p", "p", "p", "p", "p", "p", "p"},
            new() { "", "", "", "", "", "", "", "" },
            new() { "", "", "", "", "", "", "", "" },
            new() { "", "", "", "", "", "", "", "" },
            new() { "", "", "", "", "", "", "", "" },
            new() { "P", "P", "P", "P", "P", "P", "P", "P" },
            new() { "R", "N", "B", "Q", "K", "B", "N", "R" }
        };
        public int WhiteTime { get; set; } = 60 * 100;
        public int BlackTime { get; set; } = 60 * 100;
        public List<string> FEN { get; set; } = [];
        public string CurrentPlayer { get; set; } = "White";
        public string? Winner { get; set; } = null;  
        public Dictionary<string, CastlingRights> CastlingStatus { get; set; } = new Dictionary<string, CastlingRights>()
        {
            {"White", new CastlingRights() { RookKingSide = false, RookQueenSide = false, King = false }},
            {"Black", new CastlingRights() { RookKingSide = false, RookQueenSide = false, King = false }}
        }; 

        public void UpdateCastlingStatus(Position start, Position end, string sourceSymbol, string destinationSymbol)
        {
            if (sourceSymbol.Equals("k", StringComparison.CurrentCultureIgnoreCase) || destinationSymbol.Equals("k", StringComparison.CurrentCultureIgnoreCase))
            {
                CastlingStatus[CurrentPlayer].King = true;    
            }
            if (sourceSymbol.Equals("r", StringComparison.CurrentCultureIgnoreCase) || destinationSymbol.Equals("r", StringComparison.CurrentCultureIgnoreCase))
            {
                if (start.Y == 0 || end.Y == 0)
                {
                    CastlingStatus[CurrentPlayer].RookQueenSide = true;    
                }
                if (start.Y == 7 || end.Y == 7)
                {
                    CastlingStatus[CurrentPlayer].RookKingSide = true;    
                }
            }       
        }
    }
}