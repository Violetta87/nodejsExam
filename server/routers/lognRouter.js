import Router from "express";
//Router; we can define routes and middleware specific to that router instance. 
const router = Router();
import { getUserByEmail, createUser, deleteUser, getAll, updateUser } from "../database/sqlite/crudUser.js"
import dotenv from "dotenv";
dotenv.config();
import { compare } from "bcrypt";

import { bcryptConverter } from "../database/bcrypt.js";


//validate user and login, and sends the validated email back.
router.post("/login", async (req,res) => {
    try{
        const loginInfo = req.body;

        //works in postman
        if(!loginInfo.email||!loginInfo.password){
            return res.status(400).send({
                message: "Information missing",
                status: 400
            })
        }
        //works in postman
        const loginFromDatabase = await getUserByEmail(loginInfo.email)
        if(!loginFromDatabase){
            return res.status(404).send({
                user:loginInfo.email,
                message: "Couldnt find user",
                status:404
            })
        }
        
        const isUserValid = await compare(loginInfo.password, loginFromDatabase.password)
        
        if(!isUserValid){
            return res.status(400).send({
                user:loginInfo.email,
                message: "password is not correct",
                status: 400
            })
        }

        
        if(isUserValid){
            req.session.isLoggedIn = true;
            req.session.email = loginInfo.email
            return res.status(200).send({
                isLoggedIn: true,
                user: loginInfo.email,
                message: "user found",
                status:200
            })
        }

    }catch(error){
        res.status(500).send({
            message: "internal server error" + error.message,
            status: 500
        })
    }

})


//sign up router
router.post("/sign-up", async (req,res) => {
    try{
        const createUserinput = req.body;
        const existingUser = await getUserByEmail(createUserinput.email);

        if(existingUser && createUserinput.email === existingUser.email){
            return res.status(400).send({
                user: createUserinput.mail,
                message:"User already exists",
                status: 400
            })
        }
        
        const createUserResult = await createUser(createUserinput.username, createUserinput.email, createUserinput.password)
        if(createUserResult.changes === 1){
            const createdUser = await getUserByEmail(createUserinput.email);
            console.log(createdUser)
            return res.status(200).send({
                user: createdUser.email,
                message: "User was created Succesfully",
                status: 200
            })
        }
        
    }catch(error){
        res.status(500).send({
            message: "internal server error"+ error.message,
            status: 500
        })
    }
})

//for testing in postman
router.get("/login", async (req,res) => {
    const allUsers = await getAll();
    res.send({allUsers}) 
})

//for updating password(forgot password)
router.put("/forgot-password", async (req,res) => {
    const { email, password } = req.body
    const userToBeUpdated = await getUserByEmail(email);

    try{
        if(!userToBeUpdated){
            return res.status(400).send({
                user: userToBeUpdated.email,
                message: "Couldnt find user",
                status: 400
            })
        }
        if(userToBeUpdated){
            const hashedPassword = await bcryptConverter(password);
            await updateUser(userToBeUpdated.id, hashedPassword)
            return res.status(200).send({
                user: userToBeUpdated.email,
                message:"User has been updated",
                status: 200
            })
        }
    }catch(error){
        res.status(500).send({
            message: "internal server error" + error.message,
            status: 500
        })
    }

})

//works in postman
router.delete("/delete", async (req,res) => {
    try{
        const userToBeDeleted = req.body
        const findUser = await getUserByEmail(userToBeDeleted.email)
        if(!findUser){
            return res.status(200).send({
                user:userToBeDeleted.email,
                message: "User has not been deleted",
                status: 400
            })
        }
        if(findUser){
            const deletedUser = await deleteUser(findUser.id)
            return res.status(200).send({
                user: deleteUser.email,
                message: "User has been succesfully deleted",
                status: 200
            })
        }
        
    }catch(error){
        res.status(500).send({
            message: "internal server error" + error.message,
            status: 500
        })
    }
})


router.post("/log-out", (req,res) => {
    req.session.destroy(() => {
        res.send({message: "logged out"})
    })
})

export default router;
