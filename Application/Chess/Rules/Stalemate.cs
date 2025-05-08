using Application.Chess.Data;
using Application.Chess.Pieces;

namespace Application.Chess.Rules;

public class Stalemate
{
    public static bool IsStalemate(PieceColor pieceColor, Piece?[,] board)
    {
        PieceColor color = pieceColor == PieceColor.White ? PieceColor.Black : PieceColor.White;
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Piece? currentPiece = board[i, j];
                if (currentPiece != null && currentPiece.Color == color)
                {
                    currentPiece.SetMoves();
                    if (currentPiece.Moves != null)
                    {
                        foreach (Position? position in currentPiece.Moves)
                        {
                            int endX = i + position.X;
                            int endY =  j + position.Y;
                            if (currentPiece.IsValidMove(new Position(i, j), new Position(endX, endY), board))
                            {
                                board[endX, endY] = board[i, j];
                                board[i, j] = null;
                                if (!Check.IsCheck(color, board))
                                {
                                    return false;
                                }
                                board[i, j] = board[endX, endY];
                                board[endX, endY] = null;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
}
