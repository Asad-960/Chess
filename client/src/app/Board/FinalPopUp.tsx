import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

type Props = {
    winner: string
}

export default function FinalPopUp({winner}: Props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/game');
    window.location.reload();
  };

  return (
    <>
      {winner.trim() !== "" && (
        <Wrapper $show={show}>
            <TableRow>
              <TableData>
            <Cross type="submit" onClick={() => setShow(!show)}>
              <svg viewBox="0 0 32 32" height="28.75" width="28.75" aria-hidden="true" data-glyph="mark-cross" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="m10.1 24.667 5.933-5.834L21.8 24.7c1.167 1.2 1.633 1.2 2.833.033 1.167-1.166 1.167-1.633 0-2.833L18.867 16l5.9-5.9c1.2-1.167 1.2-1.633 0-2.8-1.167-1.2-1.634-1.2-2.8 0l-5.934 5.867-5.9-5.934C8.967 6.033 8.5 6.033 7.3 7.2c-1.167 1.2-1.167 1.667 0 2.833L13.2 16l-5.9 5.867c-1.2 1.166-1.2 1.633-.033 2.8 1.2 1.2 1.666 1.2 2.833 0"></path></svg>
            </Cross>
            <Cup src="./public/images/cup.svg"/>
            <h3>{winner} Won!</h3>
            <ReviewButton >
                <ReviewSpan>Game Review</ReviewSpan>
            </ReviewButton>
            <PlayAgainButton onClick={handlePlayAgain}>
                <AgainSpan>
                    Play Again
                </AgainSpan>
            </PlayAgainButton>
            </TableData>
            </TableRow>
        </Wrapper>
      )}
    </>
)}
  

interface WrapperProps {
    $show: boolean;
}
const TableRow = styled.tr`
  padding: 0;
  margin: 0;
`;
const TableData = styled.td`
  width: 300px;
  height: 300px;
  padding: 0;
  margin: 0;
`

const Wrapper = styled.tfoot<WrapperProps>`
  position: absolute;
  top: 26%;
  left: 26%;
  width: 300px;
  height: 300px;
  background-color:hsl(45, 7%, 11%);
  opacity: 0.97;
  border-radius: 20px;
  text-align: center;
  display: ${props => (props.$show ? "None" : "block")};

  & h3 {
    position: relative;
    top: 15px;
    left: 13px;
    font-size: 2rem;
    color: white;
  }
  `
const ReviewSpan = styled.span`
    transform: translateY(-4px);
    background: hsl(90, 42%, 51%);
    display: inline-block;
    width: 100%;
    height:100%;
    border-radius: 10px;
    transition: transform 500ms;
    line-height: 3.4rem;
`;
const ReviewButton = styled.button`
    margin-top: 6rem;
    border-radius: 10px;
    padding:0;
    width:90%;
    height: 3.4rem;
    border: none;
    background-color: hsl(90, 56.66666666666668%, 23.52941176470588%);
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover ${ReviewSpan} {
      transform: translateY(-6px);
      transition: transform 250ms;
        
    }
    
    &:active ${ReviewSpan} {
      transform: translateY(-2px);
        transition: transform 50ms;
    }
`;
const AgainSpan = styled.span`
    transform: translateY(-4px);
    background: hsl(30, 4%, 23%);
    display: inline-block;
    width: 100%;
    height:100%;
    border-radius: 10px;
    transition: transform 500ms;
    line-height: 3.4rem;
    `;
const PlayAgainButton = styled.button`
    cursor: pointer;
    margin-top: 12px;
    padding: 0;
    border-radius: 10px;
    background-color:black;
    width:90%;
    height: 3.4rem;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;

    &:hover ${AgainSpan} {
        transform: translateY(-6px);
        transition: transform 250ms;
        
    }
    
    &:active ${AgainSpan} {
        transform: translateY(-2px);
        transition: transform 50ms;
    }
`;
const Cross = styled.button`
  position: absolute;
  z-index: 200;
  right: 5px;
  top: 5px;
  fill: white;
  background: none;
  border: none;
  cursor: pointer;
`;
const Cup = styled.img`
  position: absolute;
  height: 60px;
  left: 10px;
  top: 10px;
`;
