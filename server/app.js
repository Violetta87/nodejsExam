import express from "express";
//instanziate
const app = express();
//parsing all incoming requests to javascript object from json. 
app.use(express.json());

//use() sets up the middleware function express.static that serves static files from
//the given directory; client/dist
app.use(express.static("../client/dist"))


//package that allow to load enviromental variabel from .env file (root directory of the project)
//storing sensitive data for use in application.
import dotenv from "dotenv";
//reads content of .env file and sets process.env object to what variable is written in the file. 
//so we can access them.
dotenv.config();


//cors() return middleware function that can handle CORS requests
//app.use - the cors() is added to the express.js applikation (every requests)
import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true,
    secret: process.env.CORS_KEY
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, //session key should not be saved on every request
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        secure: false,
        sameSite: true
    } //session created for anomonous user if not modified.
}));


import loginRouter from "./routers/lognRouter.js"
import motorcycleRouter from "./routers/motorcycleRouter.js"
import profileRouter from "./routers/profileRouter.js"

//is Authorized
//if user is loggin in, next() is called - forstår ikke helt next()
const isAuthorized = (req,res,next) => {
    if(!req.session.isLoggedIn){
        res.status(401).send({message: "Not logged in"})
    }
        next();
}
//Man bestemmer hvilke routes hvor der skal være authorization.
app.use("/profile-info", isAuthorized);
app.use("/profile-info-by-email", isAuthorized);
app.use(profileRouter)
app.use(motorcycleRouter)
app.use(loginRouter);




const PORT = 3000;

app.listen(PORT,(error) => {
    if(error) {
        console.log(error)
}
console.log("Server is running on PORT:", PORT) 
})

