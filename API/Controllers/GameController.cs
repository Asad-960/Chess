using API.Models;
using API.Services;
using Application.Chess.Commands;
using Application.Chess.Data;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class GameController : BaseApiController
    {
        private IChessGameService _gameService;
        private readonly ChessClockService _clock;
        public GameController(IChessGameService gameService, ChessClockService clock)
        {
            _gameService = gameService;
            _clock = clock;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateGame()
        {
            var game = (_gameService?.NewGame()) ?? throw new Exception("Game creation failed.");
            await Mediator.Send(new GetNewGame.Command {Id = game.Id});
            _clock.ResetTimer();
            _clock.CurrentTurn =  game.CurrentPlayer;
            _clock.StartTimer();
            return Ok(game);
        }
        
        [HttpGet("recentboard/{id}")]
        public IActionResult GetBoard(string id)
        {
            GameModel game = _gameService.GetGame(new Guid(id)) ?? throw new Exception("Game not found.");
            List<List<string>> board = game.Board;
            if (string.IsNullOrWhiteSpace(game.Winner))
            {
               _clock.StartTimer();
            } else {
                _clock.StopTimers();
            }
            return Ok(
                new 
                {
                    Board = board,
                    WhiteClock = _clock.WhiteTime,
                    BlackClock = _clock.BlackTime,
                    game.CurrentPlayer,
                    game.Winner,
                    game.FEN
                });
        }
        
        [HttpPut("checkthenupdate")]
        public async Task<IActionResult> CheckValidity([FromBody]MoveDto data)
        {
            GameModel game = _gameService.GetGame(new Guid(data.Id)) ?? throw new Exception("Game not found.");
            
            string sourceSymbol = game.Board[data.Start.X][data.Start.Y];
            string destinationSymbol = game.Board[data.End.X][data.End.Y];
            if  (sourceSymbol == " ")
            {
                return Ok(null);
            }
            
            string? Message = await Mediator.Send(
                new GetMoveValidity.Command 
                { 
                    Data = data, Board = game.Board,
                    CurrentPlayer = game.CurrentPlayer,
                    CastlingOptions = game.CastlingStatus[game.CurrentPlayer]
                }
            );
            if (Message == null)
            {
                return Ok(null);
            }
            game.UpdateCastlingStatus(data.Start, data.End, sourceSymbol, destinationSymbol);
            List<List<string>> board = _gameService.MakeMove(new Guid(data.Id), data.Start, data.End, Message);            
            game.Board = board;
            
            game.CurrentPlayer = game.CurrentPlayer == "White" ? "Black" : "White";
            _gameService.UpdateGame(game.Id, game);
            
            _clock.CurrentTurn = game.CurrentPlayer;
            _clock.StartTimer();
            if (!string.IsNullOrWhiteSpace(game.Winner))
            {
                _clock.StopTimers();
            }
            return Ok(new { Move = Message, Game = game});
        }
    }
}