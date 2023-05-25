import db from "./connectionSQLITE.js";
import { bcryptConverter } from "../bcrypt.js";

//create - virker i postman
export async function createUser(username, email, password){
    try{
        const hashedPassword = await bcryptConverter(password)
        const sql = `INSERT INTO login (username, email, password) VALUES (?,?,?)`; 
        const result = await db.run(sql, [username, email, hashedPassword]);
        return result
        
    }
    catch(error){
        console.log(error)
        throw error
    }
}

//read - virker i postman
export async function getUserByEmail(email){
    const sql = `SELECT * FROM login WHERE email=?`;
    const result = await db.get(sql, [email]);
    console.log(result)
    return result;
}

//get all users - necessary in terms of testing in post
export async function getAll(){
    const sql = `SELECT * FROM login`;
    const result = await db.all(sql)
    return result;
}

//update -forgot password - new password
export async function updateUser(id, updates){
    const sql = `UPDATE login SET password=? WHERE id=?`;
    const result = await db.run(sql, [updates, id]);
    return result;
}

//delete
export async function deleteUser(id){
    const sql = `DELETE FROM login WHERE id=?`;
    const result = await db.run(sql, [id]);
    return result;
}