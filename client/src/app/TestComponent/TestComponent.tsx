import { useBoard } from "../../lib/hooks/useBoard";


export default function TestComponent() {
    const { CreateGame } = useBoard();
    const handleClick = () => {
        // Call the mutation function to create a game
        CreateGame.mutate(undefined, {
            onSuccess: (data : ChessGame) => {
                console.log("Game Created:", data);
            }
        });
    };
    
  return (
    <button onClick={handleClick}>
      Create Game
    </button>
  )
}
