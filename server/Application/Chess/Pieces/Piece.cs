using Application.Chess.Data;

namespace Application.Chess.Pieces
{
    public enum PieceColor
    {
        White, Black
    }
    public abstract class Piece(PieceColor color)
    {
        public List<Position>? Moves { get; protected set; }
        public PieceColor Color { get; private set; } = color;
        public abstract bool IsValidMove(Position start, Position end, Piece?[,] board);
        public abstract void SetMoves();
        public static bool IsValidRange(Position start, Position end)
        {
            if (start.X < 0 || start.X > 7 || start.Y < 0 || start.Y > 7 || 
                end.X < 0 || end.X > 7 || end.Y < 0 || end.Y > 7)
            {
                return false;
            }
            return true;
        }
    }
}