import React from "react";
import { FaXmark, FaO, FaRegSquare } from "react-icons/fa6";
import { Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

enum PlayerType {
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
  value: PlayerType | null;
}

const valueRender = (value: PlayerType | null) => {
  if (value == null) {
    return <FaRegSquare />;
  } else if (value === PlayerType.Cross) {
    return <FaXmark />;
  } else if (value === PlayerType.Nought) {
    return <FaO />;
  }
};

export const Square = () => {
  const [squareState, setSquareState] = React.useState<SquareProps>({
    x: -1,
    y: -1,
    value: null,
  });

  return <Item>{valueRender(squareState.value)}</Item>;
};
