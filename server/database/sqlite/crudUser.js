import db from "./connectionSQLITE.js";
import { bcryptConverter } from "../bcrypt.js";

//create
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

//read
export async function getUserByEmail(email){
    const sql = `SELECT * FROM login WHERE email=?`;
    const result = await db.get(sql, [email]);
    return result;
}

//delete
export async function deleteUser(id){
    const sql = `DELETE FROM login WHERE id=?`;
    const result = await db.run(sql, [id]);
    return result;
}