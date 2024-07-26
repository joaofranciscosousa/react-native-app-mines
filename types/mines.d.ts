export type Field = {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
};

export type Board = Field[][];
