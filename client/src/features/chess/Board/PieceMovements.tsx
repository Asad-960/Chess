import { useSignalR } from "../../../context/SignalRContext";
import { useBoard } from "../../../hooks/useBoard";
import { useChessSounds } from "../../../utils/sounds";
import { useEffect } from "react";



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
    turn: string,
    isOnline: boolean,
    isWhite: boolean | null
};


export const PieceMovements = ({winner,
    rowAlphabets, colNumbering,
    setWinner, setBoard,
    setWhiteMoves, setBlackMoves, gameId, time,
     turn, setTurn, isOnline, isWhite}: Props) => {
      
    const { playSound, playIllegal } = useChessSounds();
    const { VerifyMove } = useBoard();
    const conn = useSignalR();

    useEffect(() => {
      if (!conn) return;

      const handleSyncBoard = (MultiplayerResponse: ChessMove) => {
    
        if (MultiplayerResponse.game?.winner) {
          setWinner(MultiplayerResponse.game.winner);
        }
    
        const move = MultiplayerResponse.move;
    
        if (MultiplayerResponse.game.currentPlayer === "White") {
          setBlackMoves((prev) => [...prev, move]);
        } else {
          setWhiteMoves((prev) => [...prev, move]);
        }
    
        setTurn(MultiplayerResponse.game.currentPlayer);
        playSound(move);
        setBoard(MultiplayerResponse.game.board);
      };
      
      conn.on("SyncBoard", handleSyncBoard);
    
      return () => {
        conn.off("SyncBoard", handleSyncBoard); // cleanup
      };
    }, [conn, playSound]);
    
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, toRow: number, toCol: number) => {    
        if (winner !== "") return;
                
        if (isWhite !== null && isWhite === true && turn !== "White") return;
        if (isWhite !== null && isWhite === false && turn !== "Black") return;
        
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
          if (!response?.move)
          {
            playIllegal();
            return;
          }   
          if (isOnline && conn) {            
            conn.invoke("MovePiece", response, gameId);
          }
          else {
            if (response.game?.winner)
            {
              setWinner(response.game.winner);
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