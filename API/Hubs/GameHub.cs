using API.Models;
using API.Services;
using Application.Chess.Commands;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class GameHub : Hub
{
    private WaitingPlayer _waitingPlayer;
    private IChessGameService _chessGameService;
    private ChessClockService _chessClockService;
    private readonly IMediator _mediator;

    public GameHub(IChessGameService chessGameService, ChessClockService chessClockService, IMediator mediator, WaitingPlayer waitingPlayer)
    {
        _chessGameService = chessGameService;
        _chessClockService = chessClockService;
        _mediator = mediator;
        _waitingPlayer = waitingPlayer;
    }
    
    public async Task JoinGame(UserConnection user)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, user.GameId ?? "");                             
    }
    
    public async Task MovePiece(MoveResponseDto game, string id)
    {
        await Clients.Group(id).SendAsync("SyncBoard", game);
    }

    public async Task FindMatch(string username)
    {
        var currentUser = Context.ConnectionId;
        if (_waitingPlayer.WaitingPLayQueue.TryDequeue(out var opponent))
        {
            var game = _chessGameService.NewGame() ?? throw new Exception("Game creation failed.");
            await _mediator.Send(new GetNewGame.Command {Id = game.Id, Black = username, White = opponent[1]});
            _chessClockService.ResetTimer();
            _chessClockService.CurrentTurn =  game.CurrentPlayer;
            _chessClockService.StartTimer();
            
            await Clients.Client(opponent[0]).SendAsync("AddPlayer", game, true, username);
            await Clients.Client(currentUser).SendAsync("AddPlayer", game, false, opponent[1]);
            
        }
        else
        {
            _waitingPlayer.WaitingPLayQueue.Enqueue([currentUser, username]);
        }
        
    }
}