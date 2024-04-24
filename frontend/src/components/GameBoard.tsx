import { Paper, Grid, Box } from "@mui/material";
import { SquareType, PlayerType, BoardType } from "../types";
import { Square } from "./Square";
import React, { useEffect } from "react";

const ROWS = 3;
const COLS = 3;

/**
 * The backend URL to make requests to
 */
const BACKEND = "";

type GameBoardProps = {
  currentPlayer: PlayerType; // Assuming PlayerType is the type of currentPlayer
  board: BoardType;
  setBoard: (board: BoardType) => void;
  setActiveGame(activeGame: boolean): void;
  activeGame: boolean;
  setWinner(winner: PlayerType | boolean): void;
  setCurrentPlayer(player: PlayerType): void;
};

export const GameBoard = ({
  currentPlayer,
  board,
  setBoard,
  setActiveGame,
  activeGame,
  setWinner,
  setCurrentPlayer,
}: GameBoardProps) => {
  useEffect(() => {
    console.log("board", board);
  }, [board]);

  const changePlayer = () => {
    if (currentPlayer === PlayerType.Cross) {
      setCurrentPlayer(PlayerType.Nought);
    } else {
      setCurrentPlayer(PlayerType.Cross);
    }
  };
  /**
   * Make a move on the game board
   * @param player The player making the move
   * @param x The x coordinate of the square on the board
   * @param y The y coordinate of the square on the board
   */
  const makeMove = (player: PlayerType, x: number, y: number) => {
    // TODO: Make API call to make move
    // Send a POST request to the backend with the player, x and y coordinates
    // The response should be the updated board
    fetch(`${BACKEND}/make-move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player, x, y }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const {
          value,
          gameStatus: { board, emptySlots, occupiedSlots, winner },
        } = data;
        setBoard(board);

        if (winner || emptySlots === 0) {
          setActiveGame(false);
          if (winner === null) {
            setWinner(false);
          } else setWinner(winner);
        } else {
          changePlayer();
        }
      })
      .catch((error) => console.log(error));
  };

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
                <Square
                  currentPlayer={currentPlayer}
                  makeMove={makeMove}
                  value={board.length != 0 ? board[x][y].value : null}
                  x={x}
                  y={y}
                  activeGame={activeGame}
                />
              </Grid>
            ));
          })}
        </Grid>
      </Box>
    </Box>
  );
};
