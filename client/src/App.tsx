import styled from "styled-components";
import Board from "./app/Board/Board";
import Menu from "./app/Menu/Menu";
import GameLog from "./app/GameLog/GameLog";
import { useState } from "react";

const Chessboard = () => {
  
  const [whiteMoves, setWhiteMoves] = useState([""]);
  const [blackMoves, setBlackMoves] = useState([""]);
  return (
    <Wrapper>
      <Menu />
      {/* <Outlet /> */}
      <Board setWhiteMoves={setWhiteMoves} setBlackMoves={setBlackMoves} />
      <GameLog whiteMoves={whiteMoves} blackMoves={blackMoves} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 7rem 1fr 37rem;
  grid-template-areas: "Menu Board Info";
  margin: auto;
  background-color: hsl(36, 5%, 18%);
  @media (max-width: 1200px)
  {
    grid-template-columns: 1fr;
    grid-template-areas: "Board";
    margin: auto;
  }
  
`;


  
export default Chessboard;
