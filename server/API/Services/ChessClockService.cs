using System.Threading;

namespace API.Services
{
    public class ChessClockService
    {
        private Timer? _whiteTimer;
        private Timer? _blackTimer;

        public int WhiteTime { get; private set; } = 60 * 10;
        public int BlackTime { get; private set; } = 60 * 10;

        public string? CurrentTurn;
        public void StartWhiteTimer()
        {
            _whiteTimer = new Timer(_ => {
                if (WhiteTime > 0) WhiteTime--;                
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }
        public void StartBlackTimer()
        {
            _blackTimer = new Timer(_ => {
                if (BlackTime > 0) BlackTime--;                
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }
        public void StopTimers()
        {
            _whiteTimer?.Dispose();
            _blackTimer?.Dispose();
            _whiteTimer = null;
            _blackTimer = null;
        }
        public void StartTimer()
        {
            if (CurrentTurn == "White")
            {
                StopTimers();
                StartWhiteTimer();
            }
            else
            {
                StopTimers();
                StartBlackTimer();
            }
        }
        public void ResetTimer()
        {
            WhiteTime = 60 * 10;
            BlackTime = 60 * 10;
        }
    }
}