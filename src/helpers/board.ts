import { Board, Field } from "../../types/mines";

const createBoard = (rows: number, column: number): Board => {
  return Array(rows)
    .fill(0)
    .map((_, row: number) => {
      return Array(column)
        .fill(0)
        .map((_, column: number) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

const spreadMines = (board: Board, minesAmount: number) => {
  const rows: number = board?.length;
  const column: number = board[0]?.length;
  let minesPlanted: number = 0;

  while (minesPlanted < minesAmount) {
    const rowSel: number = Math.floor(Math.random() * rows);
    const columnSel: number = Math.floor(Math.random() * column);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (
  rows: number,
  column: number,
  minesAmount: number
): Board => {
  const board = createBoard(rows, column);

  spreadMines(board, minesAmount);

  return board;
};

const cloneBord = (board: Board): Board => {
  return board.map((rows) => {
    return rows.map((field) => {
      return { ...field };
    });
  });
};

const getNeighbors = (board: Board, row: number, column: number): Field[] => {
  const neighbors: Field[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];

  rows.forEach((r) => {
    columns.forEach((c) => {
      const diferent = r != row || c != column;
      const validRow = r >= 0 && r < board.length;
      const validCol = c >= 0 && c < board[0].length;

      if (diferent && validRow && validCol) {
        neighbors.push(board[r][c]);
      }
    });
  });

  return neighbors;
};

const safeNeighborhood = (
  board: Board,
  row: number,
  column: number
): boolean => {
  const safes = (result: boolean, neighbor: Field) => result && !neighbor.mined;

  return getNeighbors(board, row, column).reduce(safes, true);
};

const openField = (board: Board, row: number, column: number) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach((n: Field) =>
        openField(board, n.row, n.column)
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter((n: Field) => n.mined).length;
    }
  }
};

const fields = (board: any): Field[] => [].concat(...board);

const hadExplosion = (board: Board): boolean => {
  return fields(board).filter((field: Field) => field.exploded).length > 0;
};

const pendding = (field: Field) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);

const wonGame = (board: Board): boolean =>
  fields(board).filter(pendding).length == 0;

const showMines = (board: Board) => {
  fields(board)
    .filter((field: Field) => field.mined)
    .forEach((field: Field) => {
      field.opened = true;
    });
};

const invertFlag = (board: Board, row: number, column: number) => {
  const field: Field = board[row][column];
  field.flagged = !field.flagged;
};

const flagsUsed = (board: Board) =>
  fields(board).filter((field: Field) => field.flagged).length;

export {
  createMinedBoard,
  cloneBord,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
};
