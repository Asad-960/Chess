using Application.Chess.Moves;
using Application.Chess.Pieces;

namespace Application.Chess.Game
{
    public class Board
    {
        public static string? IsValidMove(Piece?[,] board, Position start, Position end, ChessMoves moveName)
        {
            Piece? piece = board[start.X, start.Y];
            if (piece == null || !piece.IsValidMove(start, end, board))
                return null;

            moveName.IsCapture = board[end.X, end.Y] != null;

            board[end.X, end.Y] = piece;
            board[start.X, start.Y] = null;

            bool isMyKingOnCheck = IskingInCheck(piece.Color, board);

            if (!isMyKingOnCheck)
            {
                PieceColor opponentColor = piece.Color == PieceColor.White ? PieceColor.Black : PieceColor.White;
                bool isOpponentKingOnCheck = IskingInCheck(opponentColor, board);
                
                moveName.IsCheck = isOpponentKingOnCheck; 
                
                if (isOpponentKingOnCheck)
                {
                    moveName.IsCheckmate = false;
                    if (IsCheckmate(opponentColor, board))
                    {
                        moveName.IsCheckmate = true;
                    }
                }
                return moveName.ToString();
            }
            else 
                return null;
        }

        private static bool IskingInCheck(PieceColor color, Piece?[,] board) 
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
        private static bool IsCheckmate(PieceColor color, Piece?[,] board)
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
                                    if (!IskingInCheck(color, board))
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