using System.Text.Json.Serialization;
using Application.Chess.Rules;

namespace Application.Chess.Moves
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
    public class MoveData
    {
        [JsonPropertyName("id")]
        public required string Id { get; set; }
        
        [JsonPropertyName("start")]
        public required Position Start { get; set; }

        [JsonPropertyName("end")]
        public required Position End { get; set; }

        [JsonPropertyName("symbol")]
        public required string Symbol { get; set; }

        [JsonPropertyName("board")]
        public required string[][] Board{get; set;}
        
        [JsonPropertyName("from")]
        public required string From{get; set;}
        
        [JsonPropertyName("to")]
        public required string To{get; set;}
        
        [JsonPropertyName("turn")]
        public required string Turn{get; set;}

        [JsonPropertyName("castlingRights")]
        public required CastlingRights CanCastle {get; set;}

        [JsonPropertyName("time")]
        public required int Time {get; set;}
    }
}