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
    console.log(id, "id i update mdthod")
    const updatedMotorcycle = await db.motorcycles.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: updateData},
        {returnOriginal: false}
    );
    return updatedMotorcycle;
}

//get by Id
export async function getMotorcycleById(id){
    console.log(id, "id i get motorcycle")
    const motorcycleById = await db.motorcycles.findOne(
        {_id: new ObjectId(id)}
    );
    return motorcycleById;
}

//delete
export async function deleteMotorcycle(id){
    console.log(id, "id i deletemotorcycle");
    const deletedMotorcycle = await db.motorcycles.deleteOne(
        {_id: new ObjectId(id)}
    );
    return deletedMotorcycle
}
