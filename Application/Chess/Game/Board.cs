using Application.Chess.Data;
using Application.Chess.Pieces;
using Application.Chess.Rules;


namespace Application.Chess.Game
{
    public class Board
    {
        public static string? IsValidMove(Piece?[,] board, Position start, Position end, MovesNotation moveName, CastlingRights CanCastle)
        {
            Piece? piece = board[start.X, start.Y];
            if (piece == null)  return null;
            
            moveName.IsCastling = Castle.IsCastle(piece.Color, board, start, end, CanCastle);
            

            if (!moveName.IsCastling)
            {
                if (!piece.IsValidMove(start, end, board)) return null;
                
                moveName.IsCapture = board[end.X, end.Y] != null;
                board[end.X, end.Y] = piece;
                board[start.X, start.Y] = null;
            }


            bool isMyKingOnCheck = Check.IsCheck(piece.Color, board);

            if (!isMyKingOnCheck)
            {
                PieceColor opponentColor = piece.Color == PieceColor.White ? PieceColor.Black : PieceColor.White;
                bool isOpponentKingOnCheck = Check.IsCheck(opponentColor, board);
                
                moveName.IsCheck = isOpponentKingOnCheck; 
                
                if (isOpponentKingOnCheck)
                {
                    moveName.IsCheckmate = false;
                    if (Checkmate.IsCheckmate(opponentColor, board))
                    {
                        moveName.IsCheckmate = true;
                    }
                }
                if (!moveName.IsCheckmate && Stalemate.IsStalemate(piece.Color, board))
                {
                    moveName.IsStalemate = true;            
                }
                return moveName.ToString();
            }
            else 
                return null;
        }
    }
}