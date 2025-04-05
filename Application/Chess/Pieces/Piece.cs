using Application.Chess.Moves;

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
    }
}