import Router from "express";
const router = Router();

import { foundMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle, getMotorcycleById } from "../database/mongoDB/crudMC.js";
import { errorHandler, handleClientError } from "../middleware/handlingErrors.js";

router.get("/api/motorcycles", errorHandler(async (req,res) => {
    const allMC = await foundMotorcycles()
    if(!allMC){
        return handleClientError(res, "All motorcycles could not be fetched", 400)
    }
    if(allMC){
        res.status(200).send({
            allMC: allMC,
            message: "All motorcycles fetched succesfully",
            status:200
        })
    }
}));

router.post("/api/create-motorcycles", errorHandler(async (req,res) =>{
    if(!req.session.isLoggedIn){
        return handleClientError(res,"unauthorized",403);
    }

    const createdMotorcycle = await createMotorcycle(req.body);
    if(!createMotorcycle){
        return handleClientError(res,"Failed to create motorcycle", 400)
    }else{
        res.status(200).send({
            Motorcycle: createdMotorcycle,
            message:"Motorcycle has been created",
            status: 200
        })
    }
}));

router.put("/api/update-motorcycle/:id", errorHandler(async (req,res) => {
    if(!req.session.isLoggedIn){
            return handleClientError(res,"unauthorized", 403);
    }

    const id = req.params.id;
    const motorcycleById = getMotorcycleById(id);

    if(!motorcycleById){
        handleClientError(res,"There is no motorcycle by that id", 400)
    }

    const updatedMotorcycle = req.body
    const result = await updateMotorcycle(id, updatedMotorcycle);
    if(result){
        res.status(200).send({
            Motorcycle: result,
            message: "Motorcycle has been updated",
            status: 200
        })
    }
}));

router.delete("/api/delete-motorcycle/:id", errorHandler(async (req,res) => {
    if(!req.session.isLoggedIn){
        handleClientError(res,"unauthorized",403);
    }

    const id = req.params.id
    const motorcycleById = getMotorcycleById(id);
    if(!motorcycleById){
        handleClientError(res,"There is no such Motorcycle with the given id", 400);
    }

    const result = await deleteMotorcycle(id)
    if(result){
        res.status(200).send({
            deleteMotorcycle: id,
            message: "Motorcycle has been deleted",
            status: 200
        })
        }
}));

export default router;


