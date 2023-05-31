import Router from "express";
const router = Router();

import { getUserByEmail, createUser, deleteUser, getAll, updateUser } from "../database/sqlite/crudUser.js"
import { errorHandler, handleClientError, handleClientLoginError } from "../middleware/handlingErrors.js";
import dotenv from "dotenv";
dotenv.config();

import { compare } from "bcrypt";



//validate user and login, and sends the validated email back.
router.post("/auth/login", errorHandler(async (req,res) => {
    const loginInfo = req.body;

    if(!loginInfo.email||!loginInfo.password){
        return handleClientError(res,"Information missing",400);
    }

    const loginFromDatabase = await getUserByEmail(loginInfo.email)

    if(!loginFromDatabase){
        return handleClientLoginError(res,loginInfo.email,"Couldnt find user", 404);
    }
        
    const isUserValid = await compare(loginInfo.password, loginFromDatabase.password)

    if(!isUserValid){
        return handleClientLoginError(res, loginFromDatabase.email,"password is not correct", 400);
    }
        
    if(isUserValid){
        req.session.isLoggedIn = true;
        req.session.email = loginInfo.email;
        req.session.username = loginFromDatabase.username;
            return res.status(200).send({
                isLoggedIn: true,
                user: loginInfo.email,
                username: loginFromDatabase.username,
                message: "user found",
                status:200,
            })
    }
}));

router.post("/sign-up", errorHandler(async (req,res) => {
    const createUserinput = req.body;
    const existingUser = await getUserByEmail(createUserinput.email);

    if(existingUser && createUserinput.email === existingUser.email){
        return handleClientLoginError(res,createUserinput.email,"User aleady exists",400);
    }
        
    const createUserResult = await createUser(createUserinput.username, createUserinput.email, createUserinput.password)

    if(createUserResult.changes === 1){
        const createdUser = await getUserByEmail(createUserinput.email);
            return res.status(200).send({
                user: createdUser.email,
                message: "User was created Succesfully",
                status: 200
            })
        }
}));

router.delete("/delete/:id", errorHandler(async (req,res) => {
    const userToBeDeleted = req.body
    const findUser = await getUserByEmail(userToBeDeleted.email)

    if(!findUser){
        return handleClientLoginError(res,"User not found, and therefor not deleted", userToBeDeleted.email, 400);
    }

    const deletedUser = await deleteUser(findUser.id)

    if(deletedUser){
        return res.status(200).send({
            user: deleteUser.email,
            message: "User has been succesfully deleted",
            status: 200
        })
    }
}));


router.post("/auth/log-out", (req,res) => {
    req.session.destroy(() => {
        res.send({message: "logged out"})
    })
})

export default router;
