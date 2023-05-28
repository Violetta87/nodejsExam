import Router from "express";
const router = Router();

import { foundMc, createMC, updateMC } from "../database/mongoDB/crudMC.js";

//get all motorcycles
router.get("/motorcycles", async(req,res) => {
    const allMC = await foundMc()
    console.log(allMC)
    res.send({allMC})
})

//create motorcycles
router.post("/create-motorcycles", async (req,res) =>{
    try{
        const createdMotorcycle = await createMC(req.body);
        console.log(createdMotorcycle, hej)
        res.status(200).send({
            Motorcycle: req.body,
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
router.put("/update-motorcycles/:id", async (req,res) => {
    const id = req.params.id;
    const updatedMotorcycle = req.body
    try{
        const result = await updateMC(id, updatedMotorcycle);
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


export default router;


