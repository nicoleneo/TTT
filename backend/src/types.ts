
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
  