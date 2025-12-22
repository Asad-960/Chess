using Domain;
using MediatR;
using Persistence;


namespace Application.Chess.Commands
{
    public class GetNewGame
    {
        public class Command:IRequest<string>
        {
            public Guid Id { get; set; }
            public string? White { get; set; }
            public string? Black { get; set; }
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
                    Id = request.Id.ToString(),
                    Date = DateTime.UtcNow,
                    Player1 = request.White ?? "White",
                    Player2 = request.Black ?? "Black"
                };
                await _dataContext.Games.AddAsync(chessGame, cancellationToken);
                await _dataContext.SaveChangesAsync(cancellationToken);

                return await Task.FromResult(chessGame.Id);
            }
        }
    }
}