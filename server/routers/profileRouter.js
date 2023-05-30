import { Router } from "express";
const router = Router();
import { createProfileInfo, getProfileInfoByEmail, getLoginIdFromEmail } from "../database/sqlite/crudProfile.js"
import { errorHandler, handleClientError } from "../middleware/handlingErrors.js";

import dotenv from "dotenv"
dotenv.config();

router.post("/api/profile-info", errorHandler(async (req,res) =>{       
        if(!req.session.isLoggedIn){
            return handleClientError(res, "unauthorized", 403)
        }

        const info = await getProfileInfoByEmail(req.session.email)

        if(info.id){
            return handleClientError(res,"User has already provided information", 400)
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
    
}));

router.get("/api/profile-info-by-email", errorHandler(async (req,res) =>{
        if(!req.session.isLoggedIn){
            return handleClientError(res,"unauthorized", 403)
        }else{
            const info = await getProfileInfoByEmail(req.session.email)
            return res.status(200).send({
                user: info,
                message:"User has already succesfully updated the profile info",
                status: 200
            })
        }
}));

export default router;



