import Router from "express";
const router=Router();

import session from "express-session";

router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, //session key should not be saved on every request
    saveUninitialized: true //session created for anomonous user if not modified.
}));

router.get("/auction", (req,res) =>{
    res.send.status(200).send({});
});

export default router;