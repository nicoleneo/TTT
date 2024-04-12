import gameImpl from "./gameImpl";
import { Player, Square, GameBoard } from "./gameImpl";

describe("init", () => {
  test("initialises a 3x3 board", () => {
    const startedGameState = gameImpl.startGame();
    expect(startedGameState.board).toHaveLength(3);
    expect(startedGameState.board[2]).toHaveLength(3);
  });
});

describe("make move", () => {
  const gameState = gameImpl.startGame();
  const nought: Player = Player.Nought;
  const cross: Player = Player.Cross;

  test("unoccupied space", () => {
    let result = gameState.makeMove(nought, 1, 1);
    expect(result).toBe(nought);
    result = gameState.makeMove(cross, 0, 1);
    expect(result).toBe(cross);
  });

  test("trying to place in an occupied space", () => {
    expect(() => {
      gameState.makeMove(cross, 1, 1);
    }).toThrow("Error! square is already occupied");
  });

  test("trying to place out of bounds", () => {
    expect(() => {
      gameState.makeMove(cross, 3, 0);
    }).toThrow("Error out of bounds! invalid index of square");
  });
});

describe("check game status", () => {
  let gameState: GameBoard;
  const nought: Player = Player.Nought;
  const cross: Player = Player.Cross;

  beforeEach(() => {
    gameState = gameImpl.startGame();
  });

  test("should have 9 free spaces", () => {
    const gameStatus = gameState.checkGameStatus();
    expect(gameStatus).toMatchObject({
      emptySlots: 9,
      occupiedSlots: 0,
    });
  });

  test("after 1 move", () => {
    gameState.makeMove(nought, 1, 1);
    const gameStatus = gameState.checkGameStatus();
    expect(gameStatus).toMatchObject({
      emptySlots: 8,
      occupiedSlots: 1,
    });
  });

  test("after 3 moves (1 of which is invalid)", () => {
    try {
      gameState.makeMove(nought, 0, 0);
      gameState.makeMove(cross, 1, 1);
      gameState.makeMove(nought, 1, 1);
    } catch (error) {
      console.error(error);
    }
    const gameStatus = gameState.checkGameStatus();
    expect(gameStatus).toMatchObject({
      emptySlots: 7,
      occupiedSlots: 2,
    });
    expect(gameState.leftDiagonalCheck()).toMatchObject({
      numNoughts: 1,
      numCrosses: 1,
      isFull: false,
      stringRep: "OX_",
    });
    expect(gameState.rightDiagonalCheck()).toMatchObject({
        numNoughts: 0,
        numCrosses: 1,
        isFull: false,
        stringRep: "_X_",
      });
  });

  test("after 9 moves (1 of which is invalid)", () => {
    try {
      gameState.makeMove(nought, 0, 0);
      gameState.makeMove(cross, 0, 1);
      gameState.makeMove(nought, 0, 2);

      gameState.makeMove(cross, 1, 0);
      gameState.makeMove(nought, 1, 1);
      gameState.makeMove(cross, 1, 1); // invalid attempt for the centre square
      gameState.makeMove(cross, 1, 2); // retried in an unoccupied square

      gameState.makeMove(nought, 2, 0);
      gameState.makeMove(cross, 2, 1);
      gameState.makeMove(nought, 2, 2);

      expect(gameState.leftDiagonalCheck()).toMatchObject({
        numNoughts: 3,
        numCrosses: 0,
        isFull: true,
        stringRep: "OOO",
      });

      const gameStatus = gameState.checkGameStatus();
      expect(gameStatus).toMatchObject({
        emptySlots: 0,
        occupiedSlots: 9,
      });
    } catch (error) {
      console.error(error);
    }
  });

  describe("check game status board", () => {
    let gameState: GameBoard;
    const nought: Player = Player.Nought;
    const cross: Player = Player.Cross;
  
    beforeEach(() => {
      gameState = gameImpl.startGame();
    });


   test("check state correct", () => {
    /*
      _X_
      O__
      X__
    */
    gameState.makeMove(cross, 1, 0);
    gameState.makeMove(nought, 0, 1);
    gameState.makeMove(cross, 0, 2);
    expect(gameState.checkRow(1)).toMatchObject({
        numNoughts: 1,
        numCrosses: 0,
        isFull: false,
        stringRep: "O__",
      });
      expect(gameState.rightDiagonalCheck()).toMatchObject({
        numNoughts: 0,
        numCrosses: 1,
        isFull: false,
        stringRep: "X__",
      });
      expect(gameState.leftDiagonalCheck()).toMatchObject({
        numNoughts: 0,
        numCrosses: 0,
        isFull: false,
        stringRep: "___",
      });
      expect(gameState.checkGameStatus()).toMatchObject({
        emptySlots: 6,
        occupiedSlots: 3,
        winner: null
    })

    /*
      _XX
      OO_
      X_O
    */
    gameState.makeMove(nought, 1, 1);
    gameState.makeMove(cross, 2, 0);
    gameState.makeMove(nought, 2, 2);
    expect(gameState.checkCol(2)).toMatchObject({
        numNoughts: 1,
        numCrosses: 1,
        isFull: false,
        stringRep: "X_O",
      });

    /*
      XXX
      OOX
      XOO
    */
    gameState.makeMove(cross, 2, 1);
    gameState.makeMove(nought, 1, 2);
    gameState.makeMove(cross, 0, 0);
    expect(gameState.checkRow(0)).toMatchObject({
        numNoughts: 0,
        numCrosses: 3,
        isFull: true,
        stringRep: "XXX",
      });

    expect(gameState.checkGameStatus()).toMatchObject({
        emptySlots: 0,
        occupiedSlots: 9,
        winner: Player.Cross
    })

   });

  })

});
