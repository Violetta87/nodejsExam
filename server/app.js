import express from "express";
const app = express();
app.use(express.json());
app.use(express.static("../client/dist"))

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true,
    secret: process.env.CORS_KEY
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        secure: false,
        sameSite: true
    }
}));

import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,//15 min
    max: 100,//each IP 100 requests per 15 min.
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(apiLimiter);

app.use("/auth", rateLimit({
    windowMs:15 * 60 * 1000,
    max:4,
    standardHeaders: true,
    legacyHeaders: false,
}))

//for creating HTTP server
import http from "http"
const server = http.createServer(app);

//creates Socker.io instance
import { Server } from "socket.io"
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

//eventhandler for socket connections
io.on('connection', (socket)=>{
    socket.on("newMessage", (data) => {
        console.log("data: ", data)
        io.emit("messagesRecieved", data)
    })
})

import { checkAuthorization } from "./middleware/checkAuthorization.js";

//Routes
import loginRouter from "./routers/lognRouter.js"
import motorcycleRouter from "./routers/motorcycleRouter.js"
import profileRouter from "./routers/profileRouter.js"

//Seperates which routes needs to authorized before access
app.use("/api/profile-info", checkAuthorization);
app.use("/api/profile-info-by-email", checkAuthorization);
app.use("/api/create-motorcycles",checkAuthorization);
app.use("/api/update-motorcycle/:id", checkAuthorization);
app.use("/api/delete-motorcycle/:id", checkAuthorization);
app.use(profileRouter)
app.use(motorcycleRouter)
app.use(loginRouter);


const PORT = process.env.PORT || 8080;

server.listen(PORT,(error) => {
    if(error) {
        console.log(error)
}
console.log("Server is running on PORT:", PORT) 
})

