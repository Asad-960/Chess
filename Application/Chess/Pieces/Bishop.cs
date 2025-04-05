using Application.Chess.Moves;

namespace Application.Chess.Pieces
{
    public class Bishop(PieceColor color) : Piece(color)
    {
        public override void SetMoves()
        {
            Moves =
            [
                new(1, 1), new(2, 2), new(3, 3), new(4, 4), new(5, 5), new(6, 6), new (7, 7),
                new(-1, -1), new(-2, -2), new(-3, -3), new(-4, -4), new(-5, -5), new(-6, -6), new (-7, -7),
                new (1, -1), new (2, -2), new (3, -3), new (4, -4), new (5, -5), new (6, -6), new (7, -7),
                new (-1, 1), new (-2, 2), new (-3, 3), new (-4, 4), new (-5, 5), new (-6, 6), new (-7, 7),
            ];
        }
        public override bool IsValidMove(Position start, Position end, Piece?[,] board)
        {
            if (board[end.X, end.Y]?.Color != this.Color)
            {
                int X = end.X - start.X;
                int Y = end.Y - start.Y;
                if (Math.Abs(X) == Math.Abs(Y))
                {
                    int r = start.X;
                    int c = start.Y;
                    while (true)
                    {
                        r = r > end.X ? --r : ++r;
                        c = c > end.Y ? --c : ++c;
                        if (r == end.X || c == end.Y)
                            break;

                        if (board[r, c] != null)
                        {
                            return false;
                        }
                    }
                    return true;
                }
            }
            return false;
        }

        
    
    }
}