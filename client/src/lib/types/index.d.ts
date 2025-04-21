type ChessGame = {
    id: string;
    board: string[][];
    players: { white: string; black: string };
    moves: string[];
    currentPlayer: string;
    winner: string;
};

type ChessMove = {
    move: string;
    game: ChessGame;
};

type ReloadedGame = {
    board: string[][];
    whiteClock: number;
    blackClock: number;
    currentPlayer: string;
    winner: string;
};