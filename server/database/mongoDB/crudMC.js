import db from "./createConnection.js";
import { ObjectId } from "mongodb";

//create
export async function createMotorcycle(motocycleData){
    const createdMC = db.motorcycles.insertOne(motocycleData);
}

//find
export async function foundMotorcycles(){
    const motorcycles = await db.motorcycles.find().toArray();
    return motorcycles;
}

//update - virker ikke - alt virker i frontend, 
export async function updateMotorcycle(id, updateData){
    const updatedMotorcycle = await db.motorcycles.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: updateData},
        {returnOriginal: false}
    );
    return updatedMotorcycle;
}

//delete
export async function deleteMotorcycle(id){
    const deletedMotorcycle = await db.motorcycles.deleteOne(
        {_id: new ObjectId(id)}
    );
    console.log(deletedMotorcycle, "deletedmotorcycle - db method")
    return deletedMotorcycle
}
