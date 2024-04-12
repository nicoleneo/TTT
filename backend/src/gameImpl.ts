export enum Player {
  "X",
  "O",
}

export type Square = {
  x: number;
  y: number;
  value: Player | null;
};

const ROWS = 3;
const COLS = 3;

class GameBoard {
  board: Square[][];

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

  checkGameStatus() {
    const emptySlots = this.board.reduce((acc: number, xCol: Square[]) => {
      const emptySquaresInCol = xCol.filter((square) => square.value === null);
      acc += emptySquaresInCol.length;
      return acc;
    }, 0);

    const occupiedSlots = ROWS * COLS - emptySlots;
    return {
      emptySlots,
      occupiedSlots,
    };
  }
}

const startGame = (): GameBoard => {
  const gameBoard = new GameBoard();
  return gameBoard;
};

const makeMove = (
  gameBoard: GameBoard,
  player: Player,
  x: number,
  y: number
) => {
  return gameBoard.makeMove(player, x, y);
};

const checkGameStatus = (gameBoard: GameBoard) => {
    return gameBoard.checkGameStatus();
}

export default { startGame, makeMove, checkGameStatus };
