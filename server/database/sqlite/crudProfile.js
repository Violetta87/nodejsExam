import db from "./connectionSQLITE.js";

//get login id from provided email
export async function getLoginIdFromEmail(email){
    try{
        const sql = `SELECT id FROM login WHERE email=?`;
        const result = await db.get(sql, [email]);
        return result;
    } catch(error){
        console.log(error);
        throw error;
    }
}

//create - virker den i post man 
export async function createProfileInfo(firstname, lastname, tlf, address, loginId){
    console.log('test')
    try{
        const sql = `INSERT INTO profile(firstname, lastname, tlf, address, login_id) VALUES (?,?,?,?,?)`
        const result = await db.run(sql, [firstname, lastname, tlf, address, loginId.id])
        return result
    }
    catch(error){
        console.log(error)
        throw error
    }
}

//for testing postman
export async function getProfileInfo(){
    const sql = `SELECT * FROM profile`;
    const result = await db.all(sql)
    return result;
}

export async function getProfileInfoByEmail(email){
    const sql = `SELECT profile.* FROM profile JOIN login ON profile.login_id = login.id WHERE login.email=?`;
    const result = await db.all(sql, [email]);
    console.log(result)
    return result;
}


