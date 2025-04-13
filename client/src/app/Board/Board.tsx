import styled from "styled-components";
import pieces from "../../utils/pieces";
import { useEffect, useState } from "react";
import FinalPopUp from "./FinalPopUp";
import { useChessSounds } from '../../utils/sounds'
import { PieceMovements } from "./PieceMovements";
import { defaultBoard } from "./BoardProfile";
import WhiteProfile from "./WhiteProfile";
import BlackProfile from "./BlackProfile";
// import { useLocation } from "react-router";
import { useBoard } from "../../../lib/hooks/useBoard";

type Props = {
  setWhiteMoves: React.Dispatch<React.SetStateAction<string[]>>;
  setBlackMoves: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Board({setWhiteMoves, setBlackMoves}: Props) {

    const {initialBoard, rowAlphabets, colNumbering} = defaultBoard();
    const { playTenSeconds } = useChessSounds();
    const [whiteTime, setWhiteTime] = useState(60 * 10);
    const [blackTime, setBlackTime] = useState(60 * 10);
    const [winner, setWinner] = useState("");
    const [board, setBoard] = useState<(string | null)[][]>(initialBoard);
    const [turn, setTurn] = useState("White");
    
    const { StartGame } = useBoard();
    const [gameId, setGameId] = useState("");
    
    useEffect(() => {
      StartGame.mutate(undefined, {
        onSuccess: (data) => {
          setGameId(data);
        },
        onError: (error) => {
          console.error("Error starting game:", error);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    
    useEffect(() => {
      if (winner != '') return;
      if (whiteTime === 0)
      {
        setWinner("Black")
        return;
      }
      else if (blackTime === 0)
      {
        setWinner("White")
        return;
      }
      if (whiteTime == 10) playTenSeconds();
      if (blackTime == 10) playTenSeconds();

      const interval = setInterval(() => {
      if (turn == "White")
        setWhiteTime((prev) => (prev > 0 ? prev - 1 : 0));
      else
        setBlackTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }, [whiteTime, blackTime, turn, playTenSeconds, winner])
    
    
    const time = turn === "White" ? whiteTime : blackTime;
    
    
    const {handleDragOver, handleDragStart, handleDrop} = 
    PieceMovements(
      {
        board, winner, rowAlphabets, colNumbering, turn,
        setWinner, setBoard, setTurn, setWhiteMoves, setBlackMoves,
        gameId, time
      });
    
  return (  
    <Wrapper>
        <BlackProfile turn={turn} time={blackTime}/>
        <BoardBody>
          {board.map((row, rindex) => (
            <Row key={`${rindex}`}>
              {row.map((symbol, cindex) => (            
                <Column 
                    key={`[${rindex}][${cindex}]`} 
                    onDrop={(e) => handleDrop(e, rindex, cindex, symbol)} 
                    onDragOver={handleDragOver}
                    onDragStart={(e) => handleDragStart(e, rindex, cindex, symbol)}
                >
                  {cindex == 0 ? <ColumnNums draggable="false">{colNumbering[rindex]}</ColumnNums> : ""}
                  <Draggable>
                    {symbol == null ? " " : pieces[symbol as keyof typeof pieces]}
                  </Draggable>
                  {rindex == 7 ? <RowAlphas draggable="false">{rowAlphabets[cindex]}</RowAlphas> : ""}
                </Column>            
              ))}    
            </Row>
          ))}  
        </BoardBody>  
        <WhiteProfile turn={turn} time={whiteTime}/>

        <FinalPopUp winner={winner}/>      
    </Wrapper>
  )
}

const Wrapper = styled.table`
  grid-area: Board;
  margin: auto;
  position: relative;
  height: 80%;
  width: 75%;
  flex: 1;
  @media (max-width: 1200px)
  {
    height: 60%;
    width: 60%;
  }
  @media (max-width: 800px)
  {
    height: 80%;
    width: 80%;
  }
`;

const Draggable = styled.button`
  cursor: grab;
  border: none;
  background: none;
  outline: none;
  user-select: none;
`;

const BoardBody = styled.tbody`
//
`;

const ColumnNums = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  user-select: none;
  
  
`;
const RowAlphas = styled.span`
  position: absolute;
  bottom: 0px;
  right: 2px;
  user-select: none;

`;

const Row = styled.tr`
  height: 78.1px;
  width: 80px;
`;
  

const Column = styled.td`
  position: relative;
  text-align: center;
  background-color: hsl(60, 45%, 88%);
  
  ${Row}:nth-of-type(even) &:nth-of-type(odd),
  ${Row}:nth-of-type(odd) &:nth-of-type(even){
    background-color: hsl(90, 27%, 46%);
  }
  
  ${Row}:nth-of-type(1) &:nth-of-type(8){
    border-radius: 0 7px 0 0;  
  }
  ${Row}:nth-of-type(1) &:nth-of-type(1){
    border-radius: 7px 0 0 0;  
  }
  ${Row}:nth-of-type(8) &:nth-of-type(1){
    border-radius: 0 0 0 7px;  
  }
  ${Row}:nth-of-type(8) &:nth-of-type(8){
    border-radius: 0 0 7px 0;  
  } 
  height: 78.1px;
  width: 80px;
`;


