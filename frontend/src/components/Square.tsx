import React from "react";
import { FaXmark, FaO, FaRegSquare } from "react-icons/fa6";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MouseEvent, MouseEventHandler } from "react";
import { PlayerType } from "../types";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


interface SquareProps {
  x: number;
  y: number;
  currentPlayer: PlayerType;
  isPlayerTurn: boolean;
  value: PlayerType | null;
  makeMove: (currentPlayer: PlayerType, x: number, y: number) => void;
  activeGame: boolean;
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

export const Square: React.FC<SquareProps> = ({currentPlayer, x, y, value, makeMove, activeGame, isPlayerTurn}: SquareProps) => {

  return (
    <Item
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        aspectRatio: "1/1",
      }}
      disabled={!activeGame || !isPlayerTurn}
      onClick={() => makeMove(currentPlayer, x, y)}
    >
      {valueRender(value)}
    </Item>
  );
};
