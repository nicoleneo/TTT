export enum PlayerType {
  Cross = "X",
  Nought = "O",
}

export type SquareType = {
  x: number;
  y: number;
  value: PlayerType | null;
};

export type BoardType = SquareType[][];
