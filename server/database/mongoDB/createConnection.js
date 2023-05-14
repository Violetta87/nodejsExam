import { MongoClient } from "mongodb"

//database connected to
const url = "mongodb://127.0.0.1:27017"

const client = new MongoClient(url);

//connects to the database
await client.connect();

const db = client.db("motorcycle");

export default {
    motorcycles: db.collection("motorcycles")
};