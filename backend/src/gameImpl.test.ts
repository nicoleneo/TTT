import gameImpl from "./gameImpl";
import { Player, Square } from "./gameImpl";

describe("init", () => {
  test("initialises a 3x3 board", () => {
    const startedGameState = gameImpl.startGame();
    expect(startedGameState.board).toHaveLength(3);
    expect(startedGameState.board[2]).toHaveLength(3);
  });
});

describe("make move", () => {
  const gameState = gameImpl.startGame();
  const nought: Player = Player.O;
  const cross: Player = Player.X;

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
  const gameState = gameImpl.startGame();
  const nought: Player = Player.O;
  const cross: Player = Player.X;

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

      const gameStatus = gameState.checkGameStatus();
      expect(gameStatus).toMatchObject({
        emptySlots: 7,
        occupiedSlots: 2,
      });
    } catch (error) {
      console.error(error);
    }
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

      const gameStatus = gameState.checkGameStatus();
      expect(gameStatus).toMatchObject({
        emptySlots: 0,
        occupiedSlots: 9,
      });
    } catch (error) {
      console.error(error);
    }
  });
});