import Router from "express";
const router = Router();

//import session from "express-session"
import { foundMc } from "../database/mongoDB/crudMC.js";


router.get("/harleys", async(req,res) => {
    const allMC = await foundMc()
    console.log(allMC)
    res.send({allMC})
})

export default router;