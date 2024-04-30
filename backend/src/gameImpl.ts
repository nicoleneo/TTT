import short from 'short-uuid';

export enum Player {
  Cross = "X",
  Nought = "O",
}

export type Square = {
  x: number;
  y: number;
  value: Player | null;
};

export type LineResult = {
  numNoughts: number;
  numCrosses: number;
  isFull: Boolean;
  stringRep?: string;
  id: string;
};

const ROWS = 3;
const COLS = 3;

let gameBoard: GameBoard;

export class GameBoard {
  board: Square[][];
  gameId: string;

  constructor() {
    this.board = [];
    for (let x = 0; x < COLS; x++) {
      this.board[x] = [];
      for (let y = 0; y < ROWS; y++) {
        const square: Square = {
          x,
          y,
          value: null,
        };
        this.board[x][y] = square;
      }
    }
    const translator = short();
    const shortUuid = translator.new();
    this.gameId = shortUuid;
  }

  makeMove(player: Player, x: number, y: number): Player | Error {
    if (x >= 3 || y >= 3 || x < 0 || y < 0) {
      throw new Error("Error out of bounds! invalid index of square");
    }
    const square = this.board[x][y];
    // check if occupied
    if (square.value != null) {
      throw new Error("Error! square is already occupied");
    }
    this.board[x][y].value = player;
    return player;
  }

  checkRow(y: number): LineResult {
    let numOccupiedInRow = 0;
    let arrayRep = [];

    for (let x = 0; x < COLS; x++) {
      const squareInRow = this.board[x][y];
      if (squareInRow.value != null) {
        numOccupiedInRow++;
      }
      arrayRep.push(squareInRow.value ? squareInRow.value : "_");
    }
    return {
      numNoughts: arrayRep.filter((val) => val == Player.Nought).length,
      numCrosses: arrayRep.filter((val) => val == Player.Cross).length,
      isFull: numOccupiedInRow == COLS,
      stringRep: arrayRep.join(""),
      id: "row #" + y + " check",
    };
  }

  checkCol(x: number): LineResult {
    let numOccupiedInCol = 0;
    let arrayRep = [];
    for (let y = 0; y < ROWS; y++) {
      const squareInRow = this.board[x][y];
      if (squareInRow.value != null) {
        numOccupiedInCol++;
      }
      arrayRep.push(squareInRow.value ? squareInRow.value : "_");
    }
    return {
      numNoughts: arrayRep.filter((val) => val == Player.Nought).length,
      numCrosses: arrayRep.filter((val) => val == Player.Cross).length,
      isFull: numOccupiedInCol == ROWS,
      stringRep: arrayRep.join(""),
      id: "col #" + x + " check",
    };
  }

  leftDiagonalCheck(): LineResult {
    let numOccupiedInDiagonal = 0;
    let arrayRep = [];
    for (let i = 0; i < ROWS; i++) {
      const x = i; // 0, 1, 2
      const y = i; // 0, 1, 2
      const squareInDiagonal = this.board[x][y];
      if (squareInDiagonal.value != null) {
        numOccupiedInDiagonal++;
      }
      arrayRep.push(squareInDiagonal.value ? squareInDiagonal.value : "_");
    }
    return {
      numNoughts: arrayRep.filter((val) => val == Player.Nought).length,
      numCrosses: arrayRep.filter((val) => val == Player.Cross).length,
      isFull: numOccupiedInDiagonal == ROWS,
      stringRep: arrayRep.join(""),
      id: "leftDiagonalCheck",
    };
  }

  rightDiagonalCheck(): LineResult {
    let numOccupiedInDiagonal = 0;
    let arrayRep = [];

    for (let i = 0; i < ROWS; i++) {
      const x = i; // 0, 1, 2
      const y = ROWS - 1 - i; // 2, 1, 0
      const squareInDiagonal = this.board[x][y];
      if (squareInDiagonal.value != null) {
        numOccupiedInDiagonal++;
      }
      arrayRep.push(squareInDiagonal.value ? squareInDiagonal.value : "_");
    }
    return {
      numNoughts: arrayRep.filter((val) => val == Player.Nought).length,
      numCrosses: arrayRep.filter((val) => val == Player.Cross).length,
      isFull: numOccupiedInDiagonal == ROWS,
      stringRep: arrayRep.join(""),
      id: "rightDiagonalCheck",
    };
  }

  checkGameStatus() {
    let winner = null;
    let rowsCheck: LineResult[] = [0, 1, 2].map((rowNum) =>
      this.checkRow(rowNum)
    );

    let colsCheck: LineResult[] = [0, 1, 2].map((colNum) =>
      this.checkCol(colNum)
    );

    const leftDiagonalCheck = this.leftDiagonalCheck();
    const rightDiagonalCheck = this.rightDiagonalCheck();

    const lineChecks = [
      ...rowsCheck,
      ...colsCheck,
      leftDiagonalCheck,
      rightDiagonalCheck,
    ];

    const emptySlots = this.board.reduce((acc: number, xCol: Square[]) => {
      const emptySquaresInCol = xCol.filter((square) => square.value === null);
      acc += emptySquaresInCol.length;
      return acc;
    }, 0);

    const occupiedSlots = ROWS * COLS - emptySlots;

    const anyWinners = lineChecks.filter((lineCheck) => {
      return lineCheck.numCrosses > 2 || lineCheck.numNoughts > 2;
    });
    if (anyWinners.length > 0) {
      const winningLine = anyWinners[0];
      const noughtsResult = winningLine.numNoughts;
      const crossesResult = winningLine.numCrosses;
      winner = noughtsResult > crossesResult ? Player.Nought : Player.Cross;
    }

    return {
      board: this.board,
      emptySlots,
      occupiedSlots,
      winner,
    };
  }
}

const startGame = (): GameBoard => {
  gameBoard = new GameBoard();
  return gameBoard;
};

const makeMove = (player: Player, x: number, y: number) => {
  return gameBoard.makeMove(player, x, y);
};

const checkGameStatus = () => {
  return gameBoard.checkGameStatus();
};

export default { startGame, makeMove, checkGameStatus };
