namespace Application.Chess.Moves
{
    public class ChessMoves(string symbol, string from, string to)
    {
        public string Symbol { get; set; } = symbol; 
        public string From { get; set; } = from;
        public string To { get; set; } = to;
        public bool IsCapture { get; set; }
        public bool IsCheck { get; set; }
        public bool IsCheckmate { get; set; }
        public bool IsCastling { get; set; }
        public string? Promotion { get; set; }
        public override string ToString()
        {
            string move = "";
            if (IsCastling)
            {
                if (From.Contains('a') || To.Contains('a'))
                    move += "O-O-O";
                else
                    move += "O-O";
                return move.ToString();
            }
            if (!Symbol.Equals("p", StringComparison.CurrentCultureIgnoreCase))
            {
                move += Symbol.ToUpper();
            }
            if (IsCapture)
            {
                move += "x";
            }
            move += To;
            if (IsCheckmate)
            {
                move += "#";
            }
            else if (IsCheck)
            {
                move += "+";
            }
            return move;
        }
    }

}