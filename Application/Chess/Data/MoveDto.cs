using System.Text.Json.Serialization;


namespace Application.Chess.Data
{
    public class Position
    {
        public Position(int x, int y)
        {
            X = x;
            Y = y;
        }
        [JsonPropertyName("x")]
        public int X { get; set; }

        [JsonPropertyName("y")]
        public int Y { get; set; }

        override public string ToString()
        {
            return $"({X}, {Y})";
        }

    }
    public class MoveDto
    {
        [JsonPropertyName("id")]
        public required string Id { get; set; }
        
        [JsonPropertyName("start")]
        public required Position Start { get; set; }

        [JsonPropertyName("end")]
        public required Position End { get; set; }
        
        [JsonPropertyName("from")]
        public required string From{get; set;}
        
        [JsonPropertyName("to")]
        public required string To{get; set;}
        
        [JsonPropertyName("time")]
        public required int Time {get; set;}
    }
}