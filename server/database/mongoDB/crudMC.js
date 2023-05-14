import db from "./createConnection.js";

const foundMc = await db.motorcycles.find().toArray();
console.log(foundMc);