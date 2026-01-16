import styled from "styled-components";

/* eslint-disable react-refresh/only-export-components */
// const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>{
       
// }

const WhitePawn = () => (
    
    <Image src="/pieces/wp.png" draggable="true" />
);

const BlackPawn = () => (
    
    <Image src="/pieces/bp.png" draggable="true"  />
);

const WhiteBishop = () => (
    
    <Image src="/pieces/wb.png" draggable="true"  />
);

const BlackBishop = () => (
    
    <Image src="/pieces/bb.png" draggable="true"  />
);

const WhiteKnight = () => (

    <Image src="/pieces/wn.png" draggable="true"  />
);

const BlackKnight = () => (

    <Image src="/pieces/bn.png" draggable="true"  />
);

const WhiteRook = () => (
 
    <Image src="/pieces/wr.png" draggable="true"  />
);

const BlackRook = () => (
  
    <Image src="/pieces/br.png" draggable="true"  />

);

const WhiteQueen = () => (
    
    <Image src="/pieces/wq.png" draggable="true"  />
);

const BlackQueen = () => (
   
    <Image src="/pieces/bq.png" draggable="true"  />
);

const WhiteKing = () => (
   
    <Image src="/pieces/wk.png" draggable="true"  />
);

const BlackKing = () => (
    
    <Image src="/pieces/bk.png" draggable="true"  />
);

const pieces = {
    'P': <WhitePawn />,
    'B': <WhiteBishop />,
    'K': <WhiteKing />,
    'Q': <WhiteQueen/>,
    'R': <WhiteRook />,
    'N': <WhiteKnight />,
    'p': <BlackPawn />,
    'b': <BlackBishop />,
    'k': <BlackKing />,
    'q': <BlackQueen />,
    'r': <BlackRook />,
    'n': <BlackKnight />
}

const Image = styled.img`
    transform: none;
    filter: none;
    width: 80%; /* Scale with parent (Draggable -> Column) */
    height: 80%; /* Scale with parent (Draggable -> Column) */
    object-fit: contain; /* Maintain aspect ratio and fit within bounds */
/*       
  @media (max-width: 800px)  
  {
    height: 40px;
    width: 45px;
  }
  @media (max-width: 550px)  
  {
    transform: scale(0.9);
  } */
`;
export default pieces;

