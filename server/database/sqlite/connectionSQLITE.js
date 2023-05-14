import { open } from "sqlite";
import sqlite3 from "sqlite3";

//open() creates a new connection to sqlite database. 
//await : wait for the open() function to complete before assigning the resulting database to variable "db"
//there for connection is established before operations are performed on database. 
//
const db = await open({
    filename: "login.db",
    driver: sqlite3.Database
})


export default db;