type PiecesCastlingRights = {
    kingMoved: boolean,
    rookKingSideMoved: boolean,
    rookQueenSideMoved: boolean
}
type CastlingRights = Record<'white' | 'black', PiecesCastlingRights>

type props = {
    sourceSymbol: string,
    destinationSymbol: string | null,
    turn: string,
    fromCol: number,
    toCol: number,
    setCastlingRights: (update: (prev: CastlingRights) => CastlingRights) => void
}


export function updateCastlingRight({sourceSymbol, destinationSymbol, turn, setCastlingRights, fromCol, toCol}: props) {
    if (sourceSymbol.toLowerCase() === 'k' || destinationSymbol?.toLowerCase() === 'k')
    {
      if (turn === 'White') setCastlingRights(prev => {
        prev.white.kingMoved = true;
        return prev;
      })
      if (turn === 'Black') setCastlingRights(prev => {
        prev.black.kingMoved = true;
        return prev;
      })
    }
    if (sourceSymbol.toLowerCase() === 'r' || destinationSymbol?.toLowerCase() === 'r')
    {
      if (fromCol == 0 || toCol == 0)
      {
        if (turn === 'White') setCastlingRights(prev => {
          prev.white.rookQueenSideMoved = true;
          return prev;
        })
        if (turn === 'Black') setCastlingRights(prev => {
          prev.black.rookQueenSideMoved = true;
          return prev;
        })
      }
    
      if (fromCol == 7 || toCol == 7)
      {
          if (turn === 'White') setCastlingRights(prev => {
              prev.white.rookKingSideMoved = true;
            return prev;
          })
          if (turn === 'Black') setCastlingRights(prev => {
            prev.black.rookKingSideMoved = true;
            return prev;
          })
      }
    }
}