using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ChessGame
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Player1 { get; set; }
        public string? Player2 { get; set; }
        public List<string> Moves { get; set; } = [];
        public List<int> MovesTime { get; set; } = [];
        public int MovesPlayed {get; set;} = 0;
        public DateTime Date { get; set; }
        public string? Winner { get; set; }      
        public List<int> RemainingTime { get; set; } =  [600, 600];
    }
}