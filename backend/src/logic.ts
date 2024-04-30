import { Collection, MongoClient, ObjectId } from "mongodb";
import { Player, Square } from "./types";

const uri = process.env.MONGODB_URI || "mongodb://mongo:27017";

/**
 * Connects to a MongoDB cluster using the provided connection string
 * @param uri The connection string to use when connecting to the MongoDB cluster
 * @returns A Promise that resolves to an instance of the MongoClient class when the database is successfully connected
 */
async function getClient(): Promise<MongoClient> {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // print a message when the database is successfully connected
    console.log("Database Connected");

    return client;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    // Close the client connection
    await client.close();
    console.log("Disconnected from MongoDB server");
  }
}

const getCollection = async (collectionName: string) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // print a message when the database is successfully connected
    console.log("Database Connected");
    const db = client.db("tic-tac-toe");
    const collection = db.collection(collectionName);
    console.log("collection");
    return collection;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const retrieveGame = async (gameId: string) => {
  const games = await getCollection("games");
  const existingGame = await games.findOne({ gameId: gameId });
  console.log("existing game", gameId)
  console.log(existingGame)
  if (existingGame) {
    return existingGame;
  } else {
    throw new Error(`GameId ${gameId} not found!`);
  }
};

export const saveGame = async (
  gameId: string,
  board: Square[][],
  emptySlots: number,
  occupiedSlots: number,
  winner: Player | null,
  currentPlayer: Player
) => {
  try {
    const existingGame = await retrieveGame(gameId);
    const games = await getCollection("games");
    games.updateOne(
      { gameId: gameId },
      {
        $set: {
          board,
          emptySlots,
          occupiedSlots,
          winner,
          currentPlayer,
        },
      }
    );
  } catch {
    console.log("game not found, creating new game");
    const games = await getCollection("games");
    games.insertOne({
      _id: new ObjectId(),
      gameId,
      board,
      emptySlots,
      occupiedSlots,
      winner,
      currentPlayer,
    });
  }
};
