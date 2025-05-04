using Application.Chess.Data;
using Application.Chess.Pieces;

namespace Application.Chess.Rules
{
    public class Check
    {
        public static bool IsCheck(PieceColor color, Piece?[,] board) 
        {
            Position? KingPosition = null;
            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    Piece? piece = board[i, j];
                    if (piece is King && piece.Color == color)
                    {
                        KingPosition = new Position(i, j);
                    }     
                }
            }
            if (KingPosition == null) return false;

            for (int i = 0; i < 8; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    Piece? piece = board[i, j];
                    if (piece != null && piece.Color != color && piece.IsValidMove(new Position(i, j), KingPosition, board))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}