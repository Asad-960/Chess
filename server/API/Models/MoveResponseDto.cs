using System.Text.Json.Serialization;

namespace API.Models;


public class GameStateDto
{
    public List<List<string>> Board { get; set; } = [];
    public int WhiteTime { get; set; }
    public int BlackTime { get; set; }
    public string CurrentPlayer { get; set; } = "White";
    public string? Winner { get; set; } = null;
}
public class MoveResponseDto
{
    public GameStateDto? Game { get; set; }
    public string Move { get; set; } = "";


}
