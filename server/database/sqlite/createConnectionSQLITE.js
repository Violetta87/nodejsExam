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

//DDL profile
await db.exec(`CREATE TABLE IF NOT EXISTS profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    tlf INTEGER,
    address TEXT,
    login_id INTEGER NOT NULL,
    FOREIGn KEY (login_id) REFERENCES login (id)
)`)

//bcryp admin login
const adminPasswordHashed = await bcryptConverter(process.env.ADMIN_PASSWORD)
const adminEmail = process.env.ADMIN_EMAIL;
const adminName = process.env.ADMIN_NAME;

//DML for admin login
await db.run(`INSERT INTO login (username, email, password) VALUES (?,?,?)`, [adminName, adminEmail, adminPasswordHashed])
const data = await db.all(`SELECT * FROM login`)
console.log(data)

//DML for testing
await db.run(`INSERT INTO profile (firstname, lastname, tlf, address, login_id) VALUES (?,?,?,?,?)`, ["tina", "hansen", 28282828, "christian svendsensgade 5.3, 2300", 1])
const newdata= await db.all(`SELECT * FROM profile`)
console.log(newdata)