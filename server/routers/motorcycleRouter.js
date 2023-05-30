import Router from "express";
const router = Router();

import { foundMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from "../database/mongoDB/crudMC.js";
import { errorHandler, handleClientError } from "../middleware/handlingErrors.js";

router.get("/motorcycles", errorHandler(async (req,res) => {
    const allMC = await foundMotorcycles()
    if(allMC){
        res.status(200).send({
            allMC: allMC,
            message: "All motorcycles fetched succesfully",
            status:200
        })
    }
}));

router.post("/create-motorcycles", errorHandler(async (req,res) =>{
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

router.put("/update-motorcycle/:id", errorHandler(async (req,res) => {
    const id = req.params.id;
    const updatedMotorcycle = req.body
    
        const result = await updateMotorcycle(id, updatedMotorcycle);
        res.status(200).send({
            Motorcycle: result,
            message: "Motorcycle has been updated",
            status: 200
        })

}));

router.delete("/delete-motorcycle/:id", async (req,res) => {
    try{
        const id = req.params.id
        const result = await deleteMotorcycle(id)
        res.status(200).send({
            deleteMotorcycle: id,
            message: "Motorcycle has been deleted",
            status: 200
        })

    }catch(error){
        console.log(error)
    }
})

export default router;


