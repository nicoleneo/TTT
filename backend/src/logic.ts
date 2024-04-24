import { MongoClient } from 'mongodb';


/**
 * Connects to a MongoDB cluster using the provided connection string
 * @param uri The connection string to use when connecting to the MongoDB cluster
 * @returns A Promise that resolves to an instance of the MongoClient class when the database is successfully connected
 */
async function main(uri: string): Promise<MongoClient> {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // print a message when the database is successfully connected
        console.log('Database Connected');

        return client;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}
