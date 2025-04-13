import { useState } from "react";
import { useBoard } from "../../../lib/hooks/useBoard";
import { useChessSounds } from "../../utils/sounds";
import { updateCastlingRight } from "./ValidCastle";


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
    gameId: string,
    time: number
};


export const PieceMovements = ({board, winner,
    rowAlphabets, colNumbering,
    turn, setWinner, setBoard, setTurn,
    setWhiteMoves, setBlackMoves, gameId, time}: Props) => {
    
    
      
    const [castlingRights, setCastlingRights] = useState({
      white: {kingMoved: false, rookKingSideMoved: false, rookQueenSideMoved: false},
      black: {kingMoved: false, rookKingSideMoved: false, rookQueenSideMoved: false}
    });
    
    const { playSound, playIllegal } = useChessSounds();
    const { CheckValid } = useBoard();
    

    
    

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, toRow: number, toCol: number, destinationSymbol: string | null) => {    
        if (winner !== "") return;
        const fromRow = +e.dataTransfer.getData("fromRow");
        let fromCol = +e.dataTransfer.getData("fromColumn");

        const from = rowAlphabets[fromCol] + colNumbering[fromRow];
        const to = rowAlphabets[toCol] + colNumbering[toRow];

        let sourceSymbol = e.dataTransfer.getData("symbol")
        if (turn == "White" && sourceSymbol >= 'a' && sourceSymbol <= 'z') 
          {
            return;
        }
        if (turn == "Black" && sourceSymbol >= 'A' && sourceSymbol <= 'Z') 
        {
          return;
        }
        
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
          "symbol": sourceSymbol,
          "board": board,
          "from": from,
          "to": to,
          "castlingRights": turn == "white" ? castlingRights.white : castlingRights.black,
          "turn": turn,
          "time": time
        }          

        CheckValid.mutate((JSON.stringify(data) as unknown as JSON), {
        onSuccess: (response: string | undefined) => {     
          if (response == null || response.trim() == "")
          {
            playIllegal();
            return;
          }
          
          updateCastlingRight({sourceSymbol, destinationSymbol, turn, setCastlingRights, fromCol, toCol});
          
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
            if (sourceSymbol == 'p' || sourceSymbol == 'P')
            {
              if (toRow == 0 || toRow == 7)
              {
                sourceSymbol = String.fromCharCode(sourceSymbol.charCodeAt(0) + 1);
              }
            }
            setTurn(turn == "White"? "Black" : "White");
            if (response.includes("O-O"))
            {
              newBoard[toRow][toCol] = null;        
              newBoard[fromRow][fromCol] = null;
              if (response.includes("O-O-O")){
                toCol = toCol == 0 ? toCol + 3 : toCol - 2;
                fromCol = fromCol == 0 ? fromCol + 3 : fromCol - 2;   
              } else {
                toCol = toCol == 7 ? toCol - 2 : toCol + 2;
                fromCol = fromCol == 7 ? fromCol - 2 : fromCol + 2;  
              }
              newBoard[fromRow][fromCol] = sourceSymbol;        
              newBoard[toRow][toCol] = destinationSymbol;
            }
            else {
              newBoard[toRow][toCol] = sourceSymbol;        
              newBoard[fromRow][fromCol] = null;
            }
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