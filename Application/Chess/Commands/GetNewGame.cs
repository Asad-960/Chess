using Domain;
using MediatR;
using Persistence;


namespace Application.Chess.Commands
{
    public class GetNewGame
    {
        public class Command:IRequest<string>
        {

        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                ChessGame chessGame = new()
                {
                    Date = DateTime.UtcNow,
                    Player1 = "White",
                    Player2 = "Black"
                };
                await _dataContext.Games.AddAsync(chessGame, cancellationToken);
                await _dataContext.SaveChangesAsync();

                return await Task.FromResult(chessGame.Id);
            }
        }
    }
}