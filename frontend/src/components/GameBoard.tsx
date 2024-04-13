import { Paper, Grid, Box } from "@mui/material";
import { Square, PlayerType } from "./Square";
import React from "react";

const ROWS = 3;
const COLS = 3;

type GameBoardProps = {
  currentPlayer: PlayerType; // Assuming PlayerType is the type of currentPlayer
};
export const GameBoard = ({ currentPlayer }: GameBoardProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ height: 600, width: 600 }}>
        <Grid container spacing={2}>
          {[...Array(ROWS)].map((item, y) => {
            return [...Array(COLS)].map((item, x) => (
              <Grid
                item
                xs={4}
                key={`row-${y}-col-${x}`}
                className={`row-${y}-col-${x}`}
              >
                <Square currentPlayer={currentPlayer} x={x} y={y} />
              </Grid>
            ));
          })}
        </Grid>
      </Box>
    </Box>
  );
};
