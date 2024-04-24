import { Button, Paper, Grid } from "@mui/material";
import { SquareType, PlayerType, BoardType } from "../types";
import React, { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";

const BACKEND = "";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(
    PlayerType.Cross
  );
  const [board, setBoard] = React.useState<BoardType>([]);
  const [activeGame, setActiveGame] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<PlayerType | null | boolean>(null);

  const newGame = () => {
    // TODO: clear state
    // TODO: API call
    console.log("new game");
    fetch(`${BACKEND}/start-game`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoard(data.board);
      })
      .catch((error) => console.log(error));
    setCurrentPlayer(PlayerType.Cross); // first player
    setActiveGame(true);
    setWinner(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <GameBoard
          currentPlayer={currentPlayer}
          board={board}
          setBoard={setBoard}
          activeGame={activeGame}
          setActiveGame={setActiveGame}
          setWinner={setWinner}
          setCurrentPlayer={setCurrentPlayer}
        />
      </Grid>
      <Grid item xs={4} sx={{ padding: 20 }}>
        <Paper sx={{ m: "16px", p: "16px" }}>
          <Button onClick={newGame}>Reset</Button>
        </Paper>
        <Paper sx={{ m: "16px", p: "16px" }}>
          {activeGame && `Current Player: ${currentPlayer}`}
          {!activeGame && winner === false ? "Draw" : !activeGame && winner ? `Winner is ${winner}` : ""}
        </Paper>
      </Grid>
    </Grid>
  );
};
