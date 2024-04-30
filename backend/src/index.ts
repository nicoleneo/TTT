// src/index.js
import express, { Express, Request, Response } from "express";
import gameImpl from "./gameImpl";
import path from "path";
import { saveGame } from "./logic";

// TODO: game session and store session for multiplayer

const app: Express = express();
const port = 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/* serve built frontend (symlink ../../frontend/dist) */
app.use("/frontend", express.static("frontend"));

app.get("/frontend/*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

var router = express.Router();

router.post("/start-game", async (req: Request, res: Response) => {
  res.send(await gameImpl.startGame());
});

router.post("/join-game", async (req: Request, res: Response, next: any) => {
  console.log(req.body);
  const { gameId } = req.body;
  try {
    // check if game exists
    const gameBoard = await gameImpl.joinGame(gameId);
    const gameStatus = gameBoard.checkGameStatus();
    res.send({ success: true, gameStatus });
  } catch (err) {
    next(err);
  }
});

router.post("/make-move", async (req: Request, res: Response, next: any) => {
  console.log(req.body);
  const { gameId, player, x, y } = req.body;
  try {
    // check if game exists
    const gameBoard = await gameImpl.joinGame(gameId);
    const value = gameBoard.makeMove(player, x, y);
    const gameStatus = gameBoard.checkGameStatus();
    const {board, emptySlots, occupiedSlots, winner, currentPlayer} = gameStatus;
    await saveGame(gameId, board, emptySlots, occupiedSlots, winner, currentPlayer);
    res.send({ value, gameStatus });
  } catch (err) {
    next(err);
  }
});

router.get("/get-game-state/:gameId", async (req: Request, res: Response) => {
  const gameId = req.params.gameId;
  try {
    // check if game exists
    const gameBoard = await gameImpl.joinGame(gameId);
    const gameStatus = gameBoard.checkGameStatus();
    res.send(gameStatus);
  } catch (err) {
    next(err);
  }});

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
function next(err: unknown) {
  throw new Error("Function not implemented.");
}

