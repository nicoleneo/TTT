export enum PlayerType {
  Cross = "X",
  Nought = "O",
}

export type SquareType = {
  x: number;
  y: number;
  value: PlayerType | null;
};

export type GameStatusType = {
  board: BoardType;
  emptySlots: number;
  occupiedSlots: number;
  winner: PlayerType | boolean;
  gameId: string;
  nextPlayer: PlayerType;
}

export type BoardType = SquareType[][];
