using MediatR;

using Persistence;
using Application.Chess.Pieces;
using Application.Chess.Moves;
using Application.Chess.Game;
using Application.Chess.Rules;
namespace Application.Chess.Commands
{
    public class GetMoveValidity
    {
        
        public class Command: IRequest<string?>
        {
            public required MoveData Data {get; set;}
            public required List<List<string>> Board { get; set; }
            public required string CurrentPlayer { get; set; }
            public required CastlingRights CastlingOptions { get; set; }
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
                        boardArray[i, j] = request.Board[i][j] switch
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
                if (boardArray[data.Start.X, data.Start.Y]?.Color.ToString() != request.CurrentPlayer)
                {
                    return null;
                }
                
                ChessMoves moveName = new(request.Board[data.Start.X][data.Start.Y], data.From, data.To);                
                
                string? Message = Board.IsValidMove(boardArray, data.Start, data.End, moveName, request.CastlingOptions);
                
                var game = await context.Games.FindAsync([data.Id], cancellationToken: cancellationToken);
                if (game != null && Message != null)
                {
                    game.MovesPlayed += 1;
                    game.Moves.Add(Message);
                    if (request.CurrentPlayer == "White") {
                        game.MovesTime.Add(game.RemainingTime[0] - data.Time);
                        game.RemainingTime[0] = data.Time;
                    } else {
                        game.MovesTime.Add(game.RemainingTime[1] - data.Time);
                        game.RemainingTime[1] = data.Time;
                    }
                    if (Message.Contains('#'))
                    {
                        game.Winner = request.CurrentPlayer;
                    }
                }
                await context.SaveChangesAsync(cancellationToken);
                return Message;
            }
        }
    }
}