using Application.Chess.Moves;

namespace Application.Chess.Pieces
{
    public class Knight(PieceColor color) : Piece(color)
    {   
        public override void SetMoves()
        {
            Moves =
            [
                new(1, 2), new(-1, -2), new(-1, 2), new(1, -2),
                new(2, 1), new(-2, -1), new(-2, 1), new(2, -1)
            ];
        }
        public override bool IsValidMove(Position start, Position end, Piece?[,] board)
        {
            int dx = end.X - start.X;
            int dy = end.Y - start.Y;
            if (Math.Abs(dx) == 2 && Math.Abs(dy) == 1 || (Math.Abs(dx) == 1 && Math.Abs(dy) == 2))
            {
                return board[end.X, end.Y] == null || board[end.X, end.Y]?.Color != this.Color;
            }
            return false;
        }
    }
}