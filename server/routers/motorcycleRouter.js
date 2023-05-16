import Router from "express";
const router = Router();

//import session from "express-session"
import { foundMc } from "../database/mongoDB/crudMC.js";

import session from "express-session";

router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, //session key should not be saved on every request
    saveUninitialized: true //session created for anomonous user if not modified.
}));


router.get("/harleys", async(req,res) => {
    const allMC = await foundMc()
    console.log(allMC)
    res.send({allMC})
})

export default router;