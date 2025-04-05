import { UseMutationResult } from "@tanstack/react-query";

type Props = {
    board: (string| null)[][],
    winner: string,
    rowAlphabets: string[],
    colNumbering: number[],
    turn: string,
    setWinner: (newWinner: string) => void,
    setTurn: (newTurn: string) => void,
    setBoard: (update: (prevMoves: (string|null)[][]) => (string|null)[][]) => void,
    setWhiteMoves: (update: (prevMoves : string[]) => string[]) => void,
    setBlackMoves: (update: (prevMoves: string[]) => string[]) => void,
    playSound: (sound: string) => void,
    playIllegal: () => void,
    CheckValid: UseMutationResult<string | undefined, Error, JSON, unknown>
};

export const pieceMovements = ({board, winner,
    rowAlphabets, colNumbering,
    turn, setWinner, setBoard, setTurn,
    setWhiteMoves, setBlackMoves, playSound,
    playIllegal, CheckValid}: Props) => {
        


    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, r: number, c: number) => {    
        if (winner !== "") return;
        const fromRow = +e.dataTransfer.getData("fromRow");
        const fromCol = +e.dataTransfer.getData("fromColumn");

        const from = rowAlphabets[fromCol] + colNumbering[fromRow];
        const to = rowAlphabets[c] + colNumbering[r];

        let symbol = e.dataTransfer.getData("symbol")
        if (turn == "White" && symbol >= 'a' && symbol <= 'z') 
        {
          return;
        }
        if (turn == "Black" && symbol >= 'A' && symbol <= 'Z') 
        {
          return;
        }

        const data = {
          "start": {
            "x": fromRow,
            "y": fromCol
          },
          "end": {
            "x": r,
            "y": c
          },
          "symbol": symbol,
          "board": board,
          "from": from,
          "to": to
        }
    
        CheckValid.mutate((JSON.stringify(data) as unknown as JSON), {
        onSuccess: (response: string | undefined) => {     
          if (response == null || response.trim() == "")
          {
            playIllegal();
            return;
          }
          if (response.includes("#"))
          {
            setWinner(turn);
          }

          if (turn === "White")
          {
            setWhiteMoves(prevMoves => [...prevMoves, response]);
          } else {
            setBlackMoves(prevMoves => [...prevMoves, response]);
          }

          playSound(response);
          setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]); 
            // Promotion
            if (symbol == 'p' || symbol == 'P')
            {
              if (r == 0 || r == 7)
              {
                symbol = String.fromCharCode(symbol.charCodeAt(0) + 1);
              }
            }
            setTurn(turn == "White"? "Black" : "White");
            newBoard[r][c] = symbol;        
            newBoard[fromRow][fromCol] = null;
            return newBoard; 
          });
        }
        });  
    }
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, r: number, c: number, symbol: (string | null)) => {
        event.dataTransfer.setData("fromRow", r.toString());
        event.dataTransfer.setData("fromColumn", c.toString());
        event.dataTransfer.setData("symbol", symbol?.toString() || ""); 
    }
    
    return {
        handleDragOver,
        handleDragStart,
        handleDrop
    };
};