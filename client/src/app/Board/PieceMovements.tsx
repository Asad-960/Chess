import { useBoard } from "../../lib/hooks/useBoard";
import { useChessSounds } from "../../utils/sounds";


type Props = {
    winner: string,
    rowAlphabets: string[],
    colNumbering: number[],
    setWinner: (newWinner: string) => void,
    setTurn: (newTurn: string) => void,
    setBoard: (update: string[][]) => void,
    setWhiteMoves: (update: (prevMoves : string[]) => string[]) => void,
    setBlackMoves: (update: (prevMoves: string[]) => string[]) => void,
    gameId: string | undefined,
    time: number,
    turn: string
};


export const PieceMovements = ({winner,
    rowAlphabets, colNumbering,
    setWinner, setBoard,
    setWhiteMoves, setBlackMoves, gameId, time, turn, setTurn}: Props) => {
      
    const { playSound, playIllegal } = useChessSounds();
    const { VerifyMove } = useBoard();

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, toRow: number, toCol: number) => {    
        if (winner !== "") return;
        const fromRow = +e.dataTransfer.getData("fromRow");
        let fromCol = +e.dataTransfer.getData("fromColumn");

        const from = rowAlphabets[fromCol] + colNumbering[fromRow];
        const to = rowAlphabets[toCol] + colNumbering[toRow];
  
        const data = {
          "id": gameId,
          "start": {
            "x": fromRow,
            "y": fromCol
          },
          "end": {
            "x": toRow,
            "y": toCol
          },
          "from": from,
          "to": to,
          "time": time
        }          

        VerifyMove.mutate((JSON.stringify(data) as unknown as JSON), {
        onSuccess: (response: ChessMove | null) => {           
          console.log(response);
          if (!response?.move)
          {
            console.log(response?.move, 'hwdqqehe');
            playIllegal();
            return;
          }   
          if (response.game?.winner)
          {
            setWinner(turn);
          }
          if (turn === "White")
          {
            setWhiteMoves(prevMoves => [...prevMoves, response.move]);
          } else {
            setBlackMoves(prevMoves => [...prevMoves, response.move]);
          }
          setTurn(response.game.currentPlayer);
          playSound(response.move);
          setBoard(response.game.board);
        }
        });  
    }
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, r: number, c: number) => {
        event.dataTransfer.setData("fromRow", r.toString());
        event.dataTransfer.setData("fromColumn", c.toString());
    }
    
    return {
        handleDragOver,
        handleDragStart,
        handleDrop
    };
};