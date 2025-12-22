using Application.Chess.Data;

namespace Application.Chess.Pieces
{
    public class Pawn(PieceColor color) : Piece(color)
    {
        public override void SetMoves()
        {
            Moves =
                Color == PieceColor.White ? 
                [new(-1, 0), new(-2, 0), new(-1, -1),  new(-1, 1)]
                :
                [new(1, 0), new(2, 0), new(1, 1), new(1, -1)];
        }
        public override bool IsValidMove(Position start, Position end, Piece?[,] board)
        {
            if (!IsValidRange(start, end))
            {
                return false;
            }
            
            int direction = Color == PieceColor.White ? -1 : +1;
            
            // 1 move forward
            if (start.X + direction == end.X && start.Y == end.Y && board[end.X, end.Y] == null)
            {
                return true;
            } // Capture
            else if (start.X + direction == end.X && Math.Abs(start.Y - end.Y) == 1 && board[end.X, end.Y] != null && board[end.X, end.Y]?.Color != this.Color)
            {
                return true;
            } // 2 moves
            else if ((start.X == 1 || start.X == 6) && start.X + (direction * 2) == end.X && start.Y == end.Y && board[end.X, end.Y] == null)
            {
                if (board[start.X + direction, start.Y] == null)
                {
                    return true;
                }
            }
            
            return false;

        }
    }
}