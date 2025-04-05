namespace Persistence
{
    public class Game
    {
        public string? Player1 { get; set; }
        public string? Player2 { get; set; }
        public List<string>? Moves { get; set; }
        public DateTime Time { get; set; }
        public string? Winner { get; set; }
    }
}