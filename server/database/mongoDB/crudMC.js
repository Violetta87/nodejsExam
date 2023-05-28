import db from "./createConnection.js";

//create
export async function createMC(motocycleData){
    const createdMC = db.motorcycles.insertOne(motocycleData);
}

//find
export async function foundMc(){
    const harley = await db.motorcycles.find().toArray();
    console.log(foundMc);
    return harley;
}

//update
export async function updateMC(id, updateData){
    const updatedMC = await db.motorcycles.updateOne(
        {_id: id},
        {$set: updateData}
    );
    return updatedMC;
}

//delete
