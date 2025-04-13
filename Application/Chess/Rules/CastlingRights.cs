using System.Text.Json.Serialization;

namespace Application.Chess.Rules
{
    public class CastlingRights
    {
        [JsonPropertyName("kingMoved")]
        public bool King { get; set; }

        [JsonPropertyName("rookKingSideMoved")]
        public bool RookKingSide { get; set; }

        [JsonPropertyName("rookQueenSideMoved")]
        public bool RookQueenSide { get; set; }

        public bool CanCastleKingSide()
        {
            return !King && !RookKingSide;
        }
        public bool CanCastleQueenSide()
        {
            return !King && !RookQueenSide;
        }
    }
}