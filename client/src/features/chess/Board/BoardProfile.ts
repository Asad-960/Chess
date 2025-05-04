export const defaultBoard = () => {
    // const initialBoard = [
    //     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    //     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    //     [null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null, null],
    //     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    //     ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    //   ];
    
      const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
      ];
    

      // const initialBoard = [
      //   ['r', null, null, null, 'k',null, null, 'r'],
      //   ['p', null, null, null, 'p',null, null, 'p'],
      //   [null, null, null, null, null, null, null, null],
      //   [null, null, null, null, null, null, null, null],
      //   [null, null, null, null, null, null, null, null],
      //   [null, null, null, null, null, null, null, null],
      //   ['P', null, null, null, 'P', null, null,'P'],
      //   ['R', null, null, null, 'K', null, null,'R'],
      // ];
    
    const colNumbering = [8, 7, 6, 5, 4, 3, 2, 1];
    const rowAlphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    return {initialBoard, colNumbering, rowAlphabets};
};