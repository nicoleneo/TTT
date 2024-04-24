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


/* serve built frontend (symlink ../../frontend/dist) */
app.use("/frontend", express.static("frontend"));

app.get("/frontend/*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

var router = express.Router();

router.post("/start-game", (req: Request, res: Response) => {
  res.send(gameImpl.startGame());
});

router.post("/make-move", (req: Request, res: Response, next: any) => {
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

router.get("/get-game-state", (req: Request, res: Response) => {
  res.send(gameImpl.checkGameStatus());
});

app.use('/api',router);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
