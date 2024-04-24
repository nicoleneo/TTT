// src/index.js
import express, { Express, Request, Response } from "express";
import gameImpl from "./gameImpl";
import path from "path";

// TODO: game session and store session for multiplayer

const app: Express = express();
const port = 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.get("/start-game", (req: Request, res: Response) => {
  res.send(gameImpl.startGame());
});

app.post("/make-move", (req: Request, res: Response, next: any) => {
  console.log(req.body)
  const { player, x, y } = req.body;
  try {
    const value = gameImpl.makeMove(player, x, y);
    const gameStatus = gameImpl.checkGameStatus();
    res.send({ value, gameStatus });
  } catch (err) {
    next(err);
  }
});
app.get("/get-game-state", (req: Request, res: Response) => {
  res.send(gameImpl.checkGameStatus());
});
/* serve built frontend (symlink ../../frontend/dist) */
app.use("/frontend", express.static("frontend"));

app.get("/frontend/*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
