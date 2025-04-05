using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.DTO
{
    public class GameResponse
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Player1 { get; set; }
        public string? Player2 { get; set; }
        public List<string>? Moves { get; set; }
        public DateTime Time { get; set; }
        public string? Winner { get; set; }
    }
}