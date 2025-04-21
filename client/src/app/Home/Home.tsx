import { useNavigate } from "react-router";
import styled from "styled-components"
import { useBoard } from "../../lib/hooks/useBoard";


export default function Home() {
  const navigate = useNavigate();
  const { CreateGame } = useBoard();
  
  const handleStartGame = () => {
    CreateGame.mutate(undefined, {
      onSuccess: (data: ChessGame) => {
        console.log(data.id);
        navigate(`/game/${data.id}`, { state: {board: data.board } });
      },
      onError: (error) => {
        throw new Error("Error creating game: " + error.message);
      }
    });
  };
  
  return (
    <Wrapper>
        <Heading1>Welcome to Chess</Heading1>
        <Button onClick={handleStartGame}>
            <ButtonSpan>
                Start Game
            </ButtonSpan>
        </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: White;
    background: repeating-linear-gradient(135deg, hsl(60, 4%, 14%) 0px, hsl(30, 4%, 18%) 60px);
    opacity: 0.9;

`;

const Heading1 = styled.h1`
    font-size: 3rem;
`
const ButtonSpan = styled.span`
    background: #ca1616;
    width: 9rem;
    height: 3rem;
    display: inline-block;
    line-height: 3rem;
    transform: translateY(-3px);
    border-radius: 10px;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    transition: transform 500ms;
    `;
const Button = styled.button`
    background: #e37070;
    margin-top: 1.2rem;
    width: 9rem;
    height: 3rem;
    border-radius: 10px;
    padding: 0;
    border: none;
    cursor: pointer;
    &:hover ${ButtonSpan} {
        transform: translateY(-6px);
        transition: transform 250ms;
    }
    &:active ${ButtonSpan} {
        transform: translateY(-2px);
        transition: transform 50ms;
    }

`;