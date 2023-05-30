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

export async function getProfileInfoByEmail(email){
    const sql = `SELECT profile.* FROM profile JOIN login ON profile.login_id = login.id WHERE login.email=?`;
    const result = await db.all(sql, [email]);
    return result;
}

export async function getProfileById(id){
    try{
        const sql = `SELECT * FROM profile WHERE id=?`;
        const result = await db.get(sql,[id]);
        if(result){
            return result;
        }else{
            return null;
        }
    }catch{
        console.error("Error fetching profileinformation with id: ", error);
        throw error;
    }
}

export async function updateProfile(id, firstname, lastname, tlf, address){
    try{
        const sql = `UPDATE profile SET firstname=?, lastname=?, tlf=?, address=? WHERE id=?`;
        const result = await db.run(sql, [firstname,lastname,tlf,address,id]);
        if(result.changes > 0){
            const updatedProfile = await getProfileById(id)
            return updatedProfile;
        }else{
            return console.log("couldnt fetch the profile by id")
        }
    }catch(error){
        console.error("Error updating profile: ", error)
        throw error;
    }
}


