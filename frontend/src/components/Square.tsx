import React from "react";
import { FaXmark, FaO, FaRegSquare } from "react-icons/fa6";
import { Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MouseEvent, MouseEventHandler } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export enum PlayerType {
  Cross = "X",
  Nought = "O",
}

type SquareType = {
  x: number;
  y: number;
  value: PlayerType | null;
};

interface SquareProps {
  x: number;
  y: number;
  currentPlayer: PlayerType;
}

interface SquareState {
  x: number;
  y: number;
  value: PlayerType | null;
}

const valueRender = (value: PlayerType | null) => {
  if (value == null) {
    return <FaRegSquare size={100} />;
  } else if (value === PlayerType.Cross) {
    return <FaXmark size={100} />;
  } else if (value === PlayerType.Nought) {
    return <FaO size={100} />;
  }
};

export const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const [squareState, setSquareState] = React.useState<SquareState>({
    x: -1,
    y: -1,
    value: null,
  });

  const makeMove = (player: PlayerType, x: number, y: number) => {
    // TODO: make API call to make move
    setSquareState({
      x,
      y,
      value: player,
    });
  };

  return (
    <Item
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        aspectRatio: "1/1",
      }}
      onClick={() => makeMove(props.currentPlayer, props.x, props.y)}
    >
      {valueRender(squareState.value)}
    </Item>
  );
};
