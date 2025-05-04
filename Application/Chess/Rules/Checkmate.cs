using Application.Chess.Data;
using Application.Chess.Pieces;

namespace Application.Chess.Rules
{
    public class Checkmate
    {
         public static bool IsCheckmate(PieceColor color, Piece?[,] board)
        {
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    Piece? piece= board[i ,j];
                    if (piece != null && piece.Color == color)
                    {
                        piece.SetMoves();
                        if (piece.Moves == null) throw new Exception();
                        foreach(Position move in piece.Moves)
                        {
                            int targetX = i + move.X;
                            int targetY = j + move.Y;
                            if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8)
                            {
                                Piece? tempEnd = board[targetX, targetY];
                                if (tempEnd?.Color != color && piece.IsValidMove(new Position(i, j), new Position(targetX, targetY), board))
                                {
                                    board[targetX, targetY] = piece;
                                    board[i, j] = null;
                                    if (!Check.IsCheck(color, board))
                                    {
                                        return false;
                                    }
                                    board[targetX, targetY] = tempEnd;
                                    board[i, j] = piece;
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }
    }
}