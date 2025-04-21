using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Application.Chess.Moves;

namespace API.Services
{
    public interface IChessGameService
    {
        GameModel NewGame();
        GameModel GetGame(Guid id);

        List<List<string>> MakeMove(Guid id, Position start, Position end, string MoveName);
        public void UpdateGame(Guid id, GameModel game);
    }
}