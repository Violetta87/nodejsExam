import { Router } from "express";
const router = Router();
import { createProfileInfo, getProfileInfo } from "../database/sqlite/crudProfile.js";

import dotenv from "dotenv"
dotenv.config();

import session from "express-session";
router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}))

router.post("/profile-info", async (req,res) =>{
    try{
        if(!req.session.user){
            return res.status(400).send({
                message:"unauthorized",
                status:400
            })
        }
        const { firstname, lastname, tlf, address } = req.body;
        if(!firstname || !lastname || !tlf || !address){
            return res.status(400).send({
                message:"Information missing",
                status: 400
            })
        }else{
            await createProfileInfo(firstname, lastname, tlf, address, req.session.user);
            return res.status(200).send({
                message: "information created",
                status: 200
            })
        }
    }catch(error){
        res.status(500).send({
            message:"Internal server error" + error.message,
            status:500
        })
    }
    
});

router.get("/profile-info", async (req,res) => {
    const result = await getProfileInfo();
    res.send({result})
})

export default router;



