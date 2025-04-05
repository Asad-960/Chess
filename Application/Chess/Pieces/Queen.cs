using Application.Chess.Moves;

namespace Application.Chess.Pieces
{
    public class Queen(PieceColor color) : Piece(color)
    {
        public override void SetMoves()
        {
            Moves =
            [
                new(1, 1), new(2, 2), new(3, 3), new(4, 4), new(5, 5), new(6, 6), new (7, 7),
                new(-1, -1), new(-2, -2), new(-3, -3), new(-4, -4), new(-5, -5), new(-6, -6), new (-7, -7),
                new (1, -1), new (2, -2), new (3, -3), new (4, -4), new (5, -5), new (6, -6), new (7, -7),
                new (-1, 1), new (-2, 2), new (-3, 3), new (-4, 4), new (-5, 5), new (-6, 6), new (-7, 7),

                new(0, 1), new(0, 2), new(0, 3), new(0, 4), new (0, 5), new (0, 6), new (0, 7),
                new (0, -1), new (0, -2), new (0, -3), new (0, -4), new (0, -5), new (0, -6), new (0, -7),
                new (1, 0), new (2, 0), new (3, 0), new (4, 0), new (5, 0), new (6, 0), new (7, 0),
                new (-1, 0), new (-2, 0), new (-3, 0), new (-4, 0), new (-5, 0), new (-6, 0) , new (-7, 0)
            ];
        }
        public override bool IsValidMove(Position start, Position end, Piece?[,] board)
        {
            if ( board[end.X, end.Y]?.Color != this.Color )
            {
                if (start.Y == end.Y) // 1,5 / 0,4
                {
                    int MinX = Math.Min(start.X, end.X);
                    int MaxX = Math.Max(start.X, end.X);
                    for (int i = MinX + 1; i < MaxX; i++)
                    {
                        if (board[i, start.Y] != null)
                        {
                            return false;
                        }
                    }
                    return true;
                }
                if (start.X == end.X)
                {
                    int MinY = Math.Min(start.Y, end.Y);
                    int MaxY = Math.Max(start.Y, end.Y);
                    for (int j = MinY + 1; j < MaxY; j++)
                    {
                        if (board[start.X, j] != null)
                        {
                            return false;
                        }
                    }
                    return true;
                }
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