import {
  Button,
  Paper,
  Grid,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
} from "@mui/material";
import { SquareType, PlayerType, BoardType } from "../types";
import React, { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";

const BACKEND = "/api";

export const Game = () => {
  const [gameId, setGameId] = React.useState<string>("");
  const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>(
    PlayerType.Cross
  );
  const [clientPlayer, setClientPlayer] = React.useState<PlayerType>(
    PlayerType.Cross
  );
  const [board, setBoard] = React.useState<BoardType>([]);
  const [activeGame, setActiveGame] = React.useState<boolean>(false);
  const [winner, setWinner] = React.useState<PlayerType | null | boolean>(null);

  const newGame = () => {
    console.log("new game");
    fetch(`${BACKEND}/start-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoard(data.board);
        setGameId(data.gameId);
        setCurrentPlayer(data.currentPlayer); // first player
        setClientPlayer(PlayerType.Cross); // this client (who requested the new game) is X
      })
      .catch((error) => console.log(error));
    setActiveGame(true);
    setWinner(null);
  };

  const joinGame = (gameId: string) => {
    console.log("join game");
    fetch(`${BACKEND}/join-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const {success, gameStatus: {board, currentPlayer, gameId, winner}} = data;
        setBoard(board);
        setGameId(gameId);
        setCurrentPlayer(currentPlayer); // 2nd player (as they joined a game)
        setClientPlayer(PlayerType.Nought); // this client
        setActiveGame(true);
        setWinner(winner);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <GameBoard
          clientPlayer={clientPlayer}
          currentPlayer={currentPlayer}
          board={board}
          setBoard={setBoard}
          activeGame={activeGame}
          setActiveGame={setActiveGame}
          setWinner={setWinner}
          setCurrentPlayer={setCurrentPlayer}
          gameId={gameId}
        />
      </Grid>
      <Grid item xs={4} sx={{ padding: 10 }}>
        <Paper sx={{ m: "16px", p: "16px" }}>
          {activeGame && `Game ID: ${gameId}`}

          <FormControl variant="standard">
            <InputLabel htmlFor="game-uuid">Game UUID</InputLabel>
            <Input
              id="game-uuid"
              aria-describedby="game-uuid-helper-text"
              onChange={(e) => setGameId(e.target.value)}
              value={gameId}
            />
            <FormHelperText id="game-uuid-helper-text">
              Enter a game UUID to join
            </FormHelperText>
            <Button
              onClick={() => newGame()}
              variant="contained"
              sx={{ margin: 2 }}
            >
              New Game
            </Button>
            <Button
              onClick={() => joinGame(gameId)}
              variant="contained"
              sx={{ margin: 2 }}
            >
              Join Game
            </Button>
          </FormControl>
        </Paper>
        <Paper sx={{ m: "16px", p: "16px" }}>
          You are playing as: {clientPlayer}<br />
          {activeGame && `Current Player: ${currentPlayer}`}
          {!activeGame && winner === false
            ? "Draw"
            : !activeGame && winner
            ? `Winner is ${winner}`
            : ""}
        </Paper>
      </Grid>
    </Grid>
  );
};
