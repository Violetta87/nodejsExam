import { Router } from "express";
const router = Router();
import { createProfileInfo, getProfileInfo, getProfileInfoByEmail } from "../database/sqlite/crudProfile.js";


import dotenv from "dotenv"
dotenv.config();

router.post("/profile-info", async (req,res) =>{
    try{
        
        if(!req.session.isLoggedIn){
            return res.status(400).send({
                message:"unauthorized",
                status:400
            })
        }else{
            await createProfileInfo(firstname, lastname, tlf, address, req.session.email);
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
//get all for postman
router.get("/profile-info", async (req,res) => {
    const result = await getProfileInfo();
    res.send({result})
})

router.post("/profile-info-by-email", async (req,res) =>{
    try{
        if(!req.session.isLoggedIn){
            return res.status(400).send({
                message: "unauthorized",
                status: 400
            })
        }else{
            const info = await getProfileInfoByEmail(userEmail)
            return res.status(200).send({
                user: info,
                message:"User has succesfully updated the profile info",
                status: 200
            })
        }
    }
catch(error){
    res.status(500).send({
        message: "Internal server error" + error.message,
        status: 500
    })
}

})

export default router;



