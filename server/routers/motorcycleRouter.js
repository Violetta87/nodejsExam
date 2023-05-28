import Router from "express";
const router = Router();

import { foundMc, createMC, updateMC } from "../database/mongoDB/crudMC.js";

//get all motorcycles
router.get("/motorcycles", async(req,res) => {
    const allMC = await foundMc()
    res.send({allMC})
})

//create motorcycles
router.post("/create-motorcycles", async (req,res) =>{
    try{
        const createdMotorcycle = await createMC(req.body);
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
router.put("/update-motorcycle/:id", async (req,res) => {
    const id = req.params.id;
    const updatedMotorcycle = req.body

    console.log(updatedMotorcycle, "kommer der input")
    try{
        const result = await updateMC(id, updatedMotorcycle);
        console.log(result)
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


