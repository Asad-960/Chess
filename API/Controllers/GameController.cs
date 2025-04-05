using Application.Chess.Commands;
using Application.Chess.Moves;
using Microsoft.AspNetCore.Mvc;

using System.ComponentModel.DataAnnotations;


namespace API.Controllers
{
    
    public class GameController : BaseApiController
    {
        [HttpPut("valid")]
        public async Task<string?> IsValid([FromBody]MoveData data)
        {
            return await Mediator.Send(new GetMoveValidity.Command {Data = data});
            // Print results
            
            // System.Console.WriteLine("FEWFWEFW");


            
        }

    }
}