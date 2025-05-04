using Application.Chess.Data;
using Application.Chess.Game;
using Application.Chess.Pieces;

namespace Application.Chess.Rules
{
    public class Castle
    {
        public static bool IsCastle(PieceColor color, Piece?[,] board, Position from, Position to, CastlingRights castlingRights)
        {    
            
            Position? king = (board[from.X, from.Y] is King) ? from : 
                    (board[to.X, to.Y] is King) ? to : null;
            Position? rook = (board[from.X, from.Y] is Rook) ? from : 
                    (board[to.X, to.Y] is Rook) ? to : null;
            
            if (king == null || rook == null)
                return false;

            if (king.X != rook.X)
                return false;

            
            if (from.Y == 0 || to.Y == 0)
            {
                if (!castlingRights.CanCastleQueenSide()) return false;
            } 
            else if (from.Y == 7 || to.Y == 7)
            {
                if (!castlingRights.CanCastleKingSide()) return false;
            }
            else 
            {
                return false;
            }
            

            int Y0 = Math.Abs(king.Y - rook.Y);
            if (Y0 != 4 && Y0 != 3)
            {
                return false;
            }
            int start = Math.Min(king.Y, rook.Y);
            int end = Math.Max(king.Y, rook.Y);
            for (int y = start + 1; y < end; y++)
            {
                if (board[rook.X, y] != null)
                {   
                    return false;
                }
                board[rook.X, y] = board[king.X, king.Y];
                board[king.X, king.Y] = null;
                if (Check.IsCheck(color, board))
                {
                    return false;
                }
                board[king.X, king.Y] = board[rook.X, y];
                board[rook.X, y] = null;   
            }
            return true;
        }
    }
}