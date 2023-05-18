import db from "./connectionSQLITE.js";

//create - virker den i post man 
export async function createProfileInfo(firstname, lastname, tlf, address, loginId){
    try{
        const sql = `INSERT INTO profile(firstname, lastname, tlf, address, login_id) VALUES (?,?,?,?,?)`
        const result = await db.run(sql, [firstname, lastname, tlf, address, loginId])
        return result
    }
    catch{
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


