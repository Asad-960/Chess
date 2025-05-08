import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import FinalPopUp from "./FinalPopUp";
import { PieceMovements } from "./PieceMovements";
import { defaultBoard } from "./BoardProfile";
import WhiteProfile from "./WhiteProfile";
import BlackProfile from "./BlackProfile";
import { useLocation, useParams } from "react-router";
import { useBoard } from "../../../hooks/useBoard";
import { useChessSounds } from "../../../utils/sounds";
import pieces from "../../../utils/pieces";


type Props = {
  setWhiteMoves: React.Dispatch<React.SetStateAction<string[]>>;
  setBlackMoves: React.Dispatch<React.SetStateAction<string[]>>;
};

type GameState = {
  board: (string | null)[][]
}
export default function Board({setWhiteMoves, setBlackMoves}: Props) {
    const location = useLocation();
    const [isWhite] = useState(location.state.isWhite);
    
    const [opponent] = useState(location.state.opponent);

    const isOnline = location.state?.isOnline === true;
    const InitialState = location.state as GameState | null;
    const {gameId} = useParams();
    const { reloadedGame, isLoadingBoard } = useBoard(gameId);
    
    const [board, setBoard] = useState<(string | null)[][] | null>(InitialState?.board || null);
    const {rowAlphabets, colNumbering} = defaultBoard();
    const { playTenSeconds } = useChessSounds();
    const [whiteTime, setWhiteTime] = useState(60 * 10);
    const [blackTime, setBlackTime] = useState(60 * 10);
    const [winner, setWinner] = useState("");
    const [turn, setTurn] = useState("White");
    
    const time = turn === "White" ? whiteTime : blackTime;
    const {handleDragOver, handleDragStart, handleDrop} = 
    PieceMovements(
      {
        winner, rowAlphabets, colNumbering, turn,
        setWinner, setBoard, setTurn, setWhiteMoves, setBlackMoves,
        gameId, time, isOnline, isWhite
      });

    if (InitialState == null || gameId == null)
    {
      return(
            <Spinner />  
      )
    }
    
    useEffect(() => {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload" && !isLoadingBoard)
      {
          if (reloadedGame)
          { 
            setTurn(reloadedGame.currentPlayer);
            setWinner(reloadedGame.winner == null ? "" : reloadedGame.winner);
            setBoard(reloadedGame?.board || null);
            setWhiteTime(reloadedGame.whiteClock);
            setBlackTime(reloadedGame.blackClock);
            console.log("Original FEN:", reloadedGame.fen);

            const White = reloadedGame.fen.filter((_, index) => index % 2 === 0);
            const Black = reloadedGame.fen.filter((_, index) => index % 2 !== 0);
                      
            console.log("White Moves:", White); // should log ["e4", "f3"]
            console.log("Black Moves:", Black); // should log ["e5", "d6"]
                      
            setWhiteMoves(White);
            setBlackMoves(Black);

          }
      }
    }, [reloadedGame?.board, isLoadingBoard]);

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
    
    
    
    
    
  return (  
    <Wrapper>
        <BlackProfile turn={turn} time={blackTime}/>
        <BoardBody>
          {board?.map((row, rindex) => (
            <Row key={`${rindex}`}>
              {row.map((symbol, cindex) => (            
                <Column 
                    key={`[${rindex}][${cindex}]`} 
                    onDrop={(e) => handleDrop(e, rindex, cindex)} 
                    onDragOver={handleDragOver}
                    onDragStart={(e) => handleDragStart(e, rindex, cindex)}
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

        <FinalPopUp winner={winner} isWhite={isWhite} opponent={opponent}/>      
    </Wrapper>
  )
}

const spin = keyframes`
  to {
    transform: translateX(100vw);
  }
`;
const Spinner = styled.span`
  position: absolute;
  top: 1px;
  height: 4px;
  width: 20%;
  // background: hsl(189, 59.80%, 61.00%);
  border: 4px solid #000;
  border-top-color: #00FF7F;
  border-radius: 20%;
  animation: ${spin} 2s linear infinite;

`;

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


