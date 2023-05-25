import db from "./createConnection.js";

//find
export async function foundMc(){
    const harley = await db.motorcycles.find().toArray();
    console.log(foundMc);
    return harley;
}

export async function createMC(){
    const createdMC = db.motorcycles.insertOne({})
}