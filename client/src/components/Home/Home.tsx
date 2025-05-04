import { useNavigate } from "react-router";
import styled from "styled-components";
import { useBoard } from "../../hooks/useBoard";

export default function Home() {
  const navigate = useNavigate();
  const { CreateGame } = useBoard();

  const handleStartGame = () => {
    CreateGame.mutate(undefined, {
      onSuccess: (data: ChessGame) => {
        console.log(data.id);
        navigate(`/game/${data.id}`, { state: { board: data.board } });
      },
      onError: (error) => {
        throw new Error("Error creating game: " + error.message);
      },
    });
  };

  return (
    <Wrapper>
      <Heading>Welcome to Chess</Heading>

      <ButtonGroup>
        {!localStorage.getItem("token") ?
          <>
            <ActionButton onClick={() => navigate("/login")}>Login</ActionButton>
            <ActionButton onClick={() => navigate("/register")}>Register</ActionButton>
          </>
          :
            <ActionButton onClick={() => {
              localStorage.removeItem("token")
              navigate("/")
            }}>
              Logout
            </ActionButton>

        }
        {
          localStorage.getItem("token") &&
          <StartGameButton onClick={handleStartGame}>
            <StartSpan>Play</StartSpan>
          </StartGameButton>
        }
      </ButtonGroup>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, hsl(36, 5%, 25%) 0%, hsl(36, 5%, 18%) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 50%;
    filter: blur(100px);
    top: -80px;
    left: -80px;
    z-index: 0;
  }

  & > * {
    z-index: 1;
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #f0f0f0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: 2px solid #ffffff80;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ffffff;
    color: hsl(36, 5%, 18%);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;
const StartSpan = styled.span`
  background: #ca1616;
  width: 100%;
  height: 100%;
  display: inline-block;
  line-height: 3rem;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  transition: transform 500ms;
`;
const StartGameButton = styled.button`
  background: #e37070;
  width: 9rem;
  height: 3rem;
  border-radius: 10px;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover ${StartSpan} {
    transform: translateY(-6px);
    transition: transform 250ms;
  }

  &:active ${StartSpan} {
    transform: translateY(-2px);
    transition: transform 50ms;
  }
`;
