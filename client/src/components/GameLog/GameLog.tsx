import styled from "styled-components";

interface GameLogProps {
  whiteMoves: string[];
  blackMoves: string[];
}

export default function GameLog({whiteMoves, blackMoves}: GameLogProps) {
  
  return (
    <Wrapper>
      <TableWrapper>
      <Table >
        <Tablebody >
        {whiteMoves.map((move: string, index: number) => (
          (
            <TableRow key={index + 1}>
              <MoveNumber>{index + 1 + "."}</MoveNumber>
              <WhiteData>
                {move}
                </WhiteData>
              <BlackData>
                
                {blackMoves[index] || ""}
                </BlackData> 
            </TableRow>
          )
        ))}
        </Tablebody>  
      </Table>
      </TableWrapper>
    </Wrapper>
  )
}

const TableRow = styled.tr`
    width: 100%;
    display: flex;
    justify-content: space-between;
    &:nth-of-type(2n + 1)
    {
      background-color: hsl(45, 5%, 16%);
    }
    font-size: 0.87rem;
    line-height: 30px;
    position: relative;
    color: hsl(30, 2%, 76%);
`;
const WhiteData = styled.td`
    position: absolute;
    left: 75px;
    font-weight: 700;
    `
const BlackData = styled.td`
    position: absolute;
    left: 180px;
    font-weight: 700;

`
const MoveNumber = styled.td`
  color: hsl(30, 1%, 58%);
  font-weight: 600;
  margin-left: 18px;

`
const Wrapper = styled.div`
  grid-area: Info;
  height: 86%;
  width: 60%;
  margin: auto;
  background: hsl(45, 5%, 14%);
  color: white;
  position: relative;
  @media (max-width: 1200px)
  {
    display: none;
  }
  
`;
const TableWrapper = styled.div`
  height: 50%;
  overflow-y: auto;  
  position: absolute;
  width: 100%;
  border-bottom: 0.001px solid hsl(40, 3%, 23%);
  border-collapse: collapse;
`
const Table = styled.table`
  width: 100%;  
`;
const Tablebody  = styled.tbody`
  width: 100%;
  height: 50%;
`
// const Image = styled.img`
//   height: 26px;

// `