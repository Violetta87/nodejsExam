import Router from "express";
const router = Router();

import { foundMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from "../database/mongoDB/crudMC.js";

//get all motorcycles
router.get("/motorcycles", async(req,res) => {
    const allMC = await foundMotorcycles()
    res.send({allMC})
})

//create motorcycles
router.post("/create-motorcycles", async (req,res) =>{
    try{
        const createdMotorcycle = await createMotorcycle(req.body);
        res.status(200).send({
            Motorcycle: createdMotorcycle,
            message:"Motorcycle has been created",
            status: 200
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
});

//update motorcycles
router.put("/update-motorcycle/:id", async (req,res) => {
    const id = req.params.id;
    const updatedMotorcycle = req.body

    try{
        const result = await updateMotorcycle(id, updatedMotorcycle);
        res.status(200).send({
            Motorcycle: result,
            message: "Motorcycle has been updated",
            status: 200
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

//cancel motorcycles
router.delete("/delete-motorcycle/:id", async (req,res) => {
    try{
        const id = req.params.id
        console.log(id, "id from postman")
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


