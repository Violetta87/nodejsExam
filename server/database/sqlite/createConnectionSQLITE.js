import db from "./connectionSQLITE.js"
import dotenv from "dotenv"
dotenv.config();
import { bcryptConverter } from "../bcrypt.js";

//process.argv contains all commandline arguments, and find index that contains delete_mode 
//followed by an if statement - if return is -1(not present) the value is assigned false, else true. 
const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false: true;

//isDeleteMode is true
if(isDeleteMode){
    db.exec(`DROP TABLE login`);
}

//DDL login informations
await db.exec(`CREATE TABLE IF NOT EXISTS login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
);`);

//bcryp admin login
const adminPasswordHashed = await bcryptConverter(process.env.ADMIN_PASSWORD)
const adminEmail = process.env.ADMIN_EMAIL;
const adminName = process.env.ADMIN_NAME;

//DML for admin login
await db.run(`INSERT INTO login (username, email, password) VALUES (?,?,?)`, [adminName, adminEmail, adminPasswordHashed])
const data = await db.all(`SELECT * FROM login`)
console.log(data)