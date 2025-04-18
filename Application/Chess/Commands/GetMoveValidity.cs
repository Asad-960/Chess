using MediatR;

using Persistence;
using Application.Chess.Pieces;
using Application.Chess.Moves;
using Application.Chess.Game;
namespace Application.Chess.Commands
{
    public class GetMoveValidity
    {
        
        public class Command: IRequest<string?>
        {
            public required MoveData Data {get; set;}
        }

        public class Handler(DataContext context) : IRequestHandler<Command, string?>
        {
            public async Task<string?> Handle(Command request, CancellationToken cancellationToken)
            {
                Piece?[,] boardArray = new Piece?[8, 8];
                for (int i = 0; i < 8; i++)
                {
                    for (int j = 0; j < 8; j++)
                    {
                        boardArray[i, j] = request.Data.Board[i][j] switch
                        {
                            "p" => new Pawn(PieceColor.Black),
                            "P" => new Pawn(PieceColor.White),
                            "r" => new Rook(PieceColor.Black),
                            "R" => new Rook(PieceColor.White),
                            "b" => new Bishop(PieceColor.Black),
                            "B" => new Bishop(PieceColor.White),
                            "n" => new Knight(PieceColor.Black),
                            "N" => new Knight(PieceColor.White),
                            "k" => new King(PieceColor.Black),
                            "K" => new King(PieceColor.White),
                            "q" => new Queen(PieceColor.Black),
                            "Q" => new Queen(PieceColor.White),
                            _ => null,
                        };
                    }
                }
                var data = request.Data;
                ChessMoves moveName = new(data.Symbol, data.From, data.To);                
                
                string? Message = Board.IsValidMove(boardArray, data.Start, data.End, moveName, data.CanCastle);
                System.Console.WriteLine("Time is " + data.Time);
                var game = await context.Games.FindAsync([data.Id], cancellationToken: cancellationToken);
                if (game != null && Message != null)
                {
                    game.MovesPlayed += 1;
                    game.Moves.Add(Message);
                    if (data.Turn == "White") {
                        game.MovesTime.Add(game.RemainingTime[0] - data.Time);
                        game.RemainingTime[0] = data.Time;
                    } else {
                        game.MovesTime.Add(game.RemainingTime[1] - data.Time);
                        game.RemainingTime[1] = data.Time;
                    }
                    if (Message.Contains('#'))
                    {
                        game.Winner = data.Turn;
                    }
                }
                await context.SaveChangesAsync(cancellationToken);

                return Message;
            }
        }
    }
}