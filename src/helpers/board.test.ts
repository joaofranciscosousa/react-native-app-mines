import { it, describe, expect, beforeEach } from "vitest";
import { cloneBord, createMinedBoard, openField } from "./board";
import { Board } from "../../types/mines";

describe("createBoard()", () => {
  it("should create the board successfully", () => {
    const inputRow = 10;
    const inputColumn = 10;
    const inputMinesAmount = 2;

    const result = createMinedBoard(inputRow, inputColumn, inputMinesAmount);

    expect(result).toBeDefined();
  });

  it("should create the board successfully with the fields number correct", () => {
    const inputRow = 15;
    const inputColumn = 12;
    const inputMinesAmount = 5;

    const result = createMinedBoard(inputRow, inputColumn, inputMinesAmount);

    expect(result.flat().length).toBe(inputRow * inputColumn);
  });

  it("should create the board with every field mined if minesAmount is bigger than fields number", () => {
    const inputRow = 15;
    const inputColumn = 12;
    const inputMinesAmount = inputRow * inputColumn;

    const result = createMinedBoard(
      inputRow,
      inputColumn,
      inputMinesAmount
    ).flat();

    expect(result.filter((item) => item.mined === true).length).toBe(
      inputRow * inputColumn
    );
  });

  it("should create the board with 0 fields if inputs is equal to 0", () => {
    const inputRow = 0;
    const inputColumn = 0;
    const inputMinesAmount = 0;

    const result = createMinedBoard(inputRow, inputColumn, inputMinesAmount);

    expect(result).toEqual([]);
  });
});

describe("cloneBord()", () => {
  it("should clone the board successfully", () => {
    const inputRow = 12;
    const inputColumn = 15;
    const inputMinesAmount = 10;

    const resultMine = createMinedBoard(
      inputRow,
      inputColumn,
      inputMinesAmount
    );

    const cloneMine = cloneBord(resultMine);

    expect(cloneMine).toEqual(cloneMine);
  });

  it("should clone the board if board has no field", () => {
    const inputRow = 0;
    const inputColumn = 0;
    const inputMinesAmount = 0;

    const resultMine = createMinedBoard(
      inputRow,
      inputColumn,
      inputMinesAmount
    );

    const cloneMine = cloneBord(resultMine);

    expect(cloneMine).toEqual(cloneMine);
  });
});

describe("openField()", () => {
  const inputRow = 10;
  const inputColumn = 10;
  const inputMinesAmount = 10;
  let board: Board;

  beforeEach(() => {
    board = createMinedBoard(inputRow, inputColumn, inputMinesAmount);
  });

  it("should open the filed successfully", () => {
    const rowNumber = 2;
    const columnNumber = 5;

    openField(board, rowNumber, columnNumber);

    expect(board[rowNumber][columnNumber].opened).toEqual(true);
  });

  it("should open the field and explode if it is mined", () => {
    const rowNumber = 2;
    const columnNumber = 5;

    board[rowNumber][columnNumber].mined = true;

    openField(board, rowNumber, columnNumber);

    expect(board[rowNumber][columnNumber].opened).toEqual(true);
    expect(board[rowNumber][columnNumber].mined).toEqual(true);
  });
});
