// src/index.js
import express, { Express, Request, Response } from "express";
import gameImpl from "./gameImpl";


const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/start-game", (req: Request, res: Response)  => {
	res.send(gameImpl.startGame());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});