using Application.Chess.Moves;

namespace Application.Chess.Pieces
{
    public class King(PieceColor color) : Piece(color)
    {
        public override bool IsValidMove(Position start, Position end, Piece?[,] board)
        {
            Piece? piece  = board[start.X, start.Y];
            if (piece  == null) return false;
            Position? opponentsKing = null;
            for (int r = 0; r < 8; r++)
            {
                for (int c = 0; c < 8; c++)
                {
                    if (board[r , c] is King && board[r , c]?.Color != this.Color)
                    {
                        opponentsKing = new Position(r, c);
                        break;
                    }
                }
                if (opponentsKing != null) break;
            }
            if (opponentsKing == null) return false;

            if (board[end.X, end.Y]?.Color != this.Color)
            {
                int X0 = end.X - start.X;
                int Y0 = end.Y - start.Y;

                if (Math.Abs(X0) <= 1 && Math.Abs(Y0) <= 1)
                {
                    if (isKingAdjacent(end, opponentsKing)) return false;
                    return true;
                }
            }
            return false;
        }

        static bool isKingAdjacent(Position k1, Position k2)
        {
            return !(Math.Abs(k1.X - k2.X) > 1 || Math.Abs(k2.Y - k1.Y) > 1);
        }

        public override void SetMoves()
        {
            Moves =
            [
                new(0, 1), new(0, -1), new(1, 0), new(-1, 0),
                new(1, 1), new(-1, 1), new(-1, -1), new(1, -1)
            ];
        }
    }
}