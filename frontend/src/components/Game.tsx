import { Button, Paper, Grid } from "@mui/material";
import { Square, PlayerType } from "./Square";
import React from "react";
import { GameBoard } from "./GameBoard";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(
    PlayerType.Cross
  );

  const newGame = () => {
    // TODO: clear state
    // TODO: API call
    setCurrentPlayer(PlayerType.Cross);
  }

  const changePlayer = () => {
    if (currentPlayer === PlayerType.Cross) {
      setCurrentPlayer(PlayerType.Nought);
    } else {
      setCurrentPlayer(PlayerType.Cross);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <GameBoard currentPlayer={currentPlayer} />
      </Grid>
      <Grid item xs={4} sx={{padding: 20}}>
      <Paper>
          <Button onClick={newGame}>Reset</Button>
        </Paper>
        <Paper>
          Change Player (Click to changePlayer):
          <Button onClick={changePlayer}>{currentPlayer}</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
