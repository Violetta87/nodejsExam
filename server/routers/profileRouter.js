import { Router } from "express";
const router = Router();
import { createProfileInfo, getProfileInfo, getProfileInfoByEmail, getLoginIdFromEmail } from "../database/sqlite/crudProfile.js";


import dotenv from "dotenv"
dotenv.config();

router.post("/profile-info", async (req,res) =>{
    try{
        
        if(!req.session.isLoggedIn){
            return res.status(400).send({
                message:"unauthorized",
                status:400
            })
        }
        const info = await getProfileInfoByEmail(req.session.email)
        console.log(info, "henter og checker info")
        if(info.id){
            return res.status(400).send({
                user: req.session.email,
                message: "User has already provided information",
                status: 400

            })
        }
        const { firstname, lastname, tlf, address } = req.body;
        const loginId = await getLoginIdFromEmail(req.session.email);
        const createdProfileInfo = await createProfileInfo(firstname, lastname, tlf, address, loginId);
        if(createdProfileInfo.changes === 1){
            const createdInfo = await getProfileInfoByEmail(req.session.email);
            return res.status(200).send({
                user: createdInfo.firstname,
                message: "Profile info was created succesfully",
                status: 200
            })
        }
    }catch(error){
        console.log('Error: ' + error)
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

router.get("/profile-info-by-email", async (req,res) =>{
    try{
        if(!req.session.isLoggedIn){
            console.log(req.session.isLoggedIn)
            return res.status(400).send({
                message: "unauthorized",
                status: 400
            })
        }else{
            const info = await getProfileInfoByEmail(req.session.email)
            console.log(info.firstname)
            return res.status(200).send({
                user: info,
                message:"User has already succesfully updated the profile info",
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



