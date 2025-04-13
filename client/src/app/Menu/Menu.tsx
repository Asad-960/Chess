import styled from "styled-components";

export default function Menu() {
  return (
    <Wrapper>
    <div>
      <MenuButton>♟️ Play</MenuButton>
      <MenuButton>🧩 Puzzles</MenuButton>
      <MenuButton>🎓 Learn</MenuButton>
      <MenuButton>🔭 Watch</MenuButton>
      <MenuButton>📰 News</MenuButton>
      <MenuButton>👥 Social</MenuButton>
    </div>
    <div>
      <RegisterButton>Register</RegisterButton>
      <LoginButton>Login</LoginButton>
    </div>
  </Wrapper>
  )
}
const Wrapper = styled.div`
    grid-area: Menu;
    background: hsl(45, 5%, 14%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 45px;
    @media (max-width: 1200px)
    {
      display: none;
    }
    `;

const MenuButton = styled.button`
  background: none;
  color: hsl(0, 0%, 100%);
  
  font-weight: 600;
  white-space: nowrap;
  padding: 10px 10px 10px 0px;
  border-radius: 10px;
  width: 6rem;
  margin: 0px 5px 10px 3px;
`
const RegisterButton = styled.button`
  background: hsl(90, 42%, 51%);
  color: white;
  font-weight: 500;
  white-space: nowrap;
  padding: 10px 10px 10px 0px;
  width: 6rem;
  border-radius: 10px;
  margin: 0px 5px 10px 3px;
`;
const LoginButton = styled.button`
  background: hsl(40, 3%, 23%);
  color: white;
  font-weight: 500;
  white-space: nowrap;
  padding: 10px 10px 10px 0px;
  width: 6rem;
  border-radius: 10px;
  margin: 2px 5px 44px 3px;
`;