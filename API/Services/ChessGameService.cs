using API.Models;
using Application.Chess.Moves;

namespace API.Services
{
    public class ChessGameService : IChessGameService
    {
        private readonly Dictionary<Guid, GameModel> _games = new Dictionary<Guid, GameModel>();
        public GameModel NewGame()
        {
            var game = new GameModel();
            _games[game.Id] = game;
            return game;
        }
        public GameModel GetGame(Guid id)
        {
            if (_games.TryGetValue(id, out var game))
            {
                return game;
            }
            throw new KeyNotFoundException("Game not found.");
        }

        public List<List<string>> MakeMove(Guid id, Position start, Position end, string MoveName)
        {
            GameModel game = GetGame(id);
            if (game != null)
            {                
                string SourcePiece = game.Board[start.X][start.Y];
                string DestinationPiece = game.Board[end.X][end.Y];
                if (MoveName.Contains("O-O"))
                {
                    game.Board[end.X][end.Y] = " ";        
                    game.Board[start.X][start.Y] = " ";
                    if (MoveName.Contains("O-O-O")){
                      end.Y = end.Y == 0 ? end.Y + 3 : end.Y - 2;
                      start.Y = start.Y == 0 ? start.Y + 3 : start.Y - 2;   
                    } else {
                      end.Y = end.Y == 7 ? end.Y - 2 : end.Y + 2;
                      start.Y = start.Y == 7 ? start.Y - 2 : start.Y + 2;  
                    }
                    game.Board[start.X][start.Y] = SourcePiece;        
                    game.Board[end.X][end.Y] = DestinationPiece;
                }
                else {
                    game.Board[end.X][end.Y] = SourcePiece;        
                    game.Board[start.X][start.Y] = " ";
                }
                if (MoveName.Contains("#")){
                    game.Winner = game.CurrentPlayer;;
                }
                game.FEN.Add(MoveName);
                return game.Board;
            }
            else
            {
                throw new KeyNotFoundException("Game not found.");
            }
        }
        public void UpdateGame(Guid id, GameModel game)
        {
            if (_games.ContainsKey(id))
            {
                _games[id] = game;
            }
            else
            {
                throw new KeyNotFoundException("Game not found.");
            }
        }

    //     public void MakeMoveFromFEN(Guid id, string fen)
    //     {
    //         GameModel game = GetGame(id);
    //         if (game != null)
    //         {
    //             for (int i = 0; i < game.FEN.Count; i++)
    //             {

    //             }
    //         }
    //         else
    //         {
    //             throw new KeyNotFoundException("Game not found.");
    //         }
    // }
    }
}