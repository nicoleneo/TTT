import { Paper, Grid, Box } from "@mui/material";
import { SquareType, PlayerType, BoardType, GameStatusType } from "../types";
import { Square } from "./Square";
import React, { useCallback, useEffect } from "react";

const ROWS = 3;
const COLS = 3;

/**
 * The backend URL to make requests to
 */
const BACKEND = "/api";

type GameBoardProps = {
  currentPlayer: PlayerType; // Assuming PlayerType is the type of currentPlayer
  clientPlayer: PlayerType; // what player this client is
  board: BoardType;
  setBoard: (board: BoardType) => void;
  setActiveGame(activeGame: boolean): void;
  activeGame: boolean;
  setWinner(winner: PlayerType | boolean): void;
  setCurrentPlayer(player: PlayerType): void;
  gameId: string;
};

export const GameBoard = ({
  currentPlayer,
  clientPlayer,
  board,
  setBoard,
  setActiveGame,
  activeGame,
  setWinner,
  setCurrentPlayer,
  gameId
}: GameBoardProps) => {
  const [isPlayerTurn, setIsPlayerTurn] = React.useState<boolean>(false);

  const setGameStatus = useCallback(
    (gameStatus: GameStatusType) => {
      const { board, emptySlots, occupiedSlots, winner, gameId, currentPlayer } =
        gameStatus;
      setBoard(board);

      if (winner || emptySlots === 0) {
        setActiveGame(false);
        if (winner === null) {
          setWinner(false);
        } else setWinner(winner);
      } else {
        setCurrentPlayer(currentPlayer);
      }
    },
    [setBoard, setActiveGame, setWinner, setCurrentPlayer]
  );

  useEffect(() => {
    console.log("currentPlayer changed", currentPlayer);
    console.log("clientPlayer", clientPlayer);

    if (currentPlayer === clientPlayer) {
      setIsPlayerTurn(true);
    } else {
      setIsPlayerTurn(false);
    }
  }, [clientPlayer, currentPlayer]);

  useEffect(() => {
    console.log("board", board);
  }, [board]);

  useEffect(() => {
    if (activeGame) {
      const intervalId = setInterval(() => {
        console.log("polling state");
        fetch(`${BACKEND}/get-game-state/${gameId}`, )
          .then((response) => response.json())
          .then((data) => {
            console.log("setting state");
            const gameStatus = data;
            setGameStatus(gameStatus);
            if (!activeGame) {
              console.log("clear timer");
              clearInterval(intervalId);
              return;
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, 5000); // Poll every 5 seconds

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [setGameStatus, activeGame, gameId]);

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
      body: JSON.stringify({ gameId, player, x, y }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { value, gameStatus } = data;
        setGameStatus(gameStatus);
        setIsPlayerTurn(false); // wait for opponent's move
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
                  isPlayerTurn={isPlayerTurn}
                />
              </Grid>
            ));
          })}
        </Grid>
      </Box>
    </Box>
  );
};
