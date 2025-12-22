using System.Collections.Concurrent;

namespace API.Services;

public class WaitingPlayer
{
    private ConcurrentQueue<List<string>> _waitingPlayerList { get; set; } = [];
    
    public ConcurrentQueue<List<string>> WaitingPLayQueue => _waitingPlayerList;
}