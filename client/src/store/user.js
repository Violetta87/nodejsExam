import { writable } from "svelte/store";

//we get the user from localstorage, and parse it to json. 
const saveUser = JSON.parse(localStorage.getItem("user"));
const savedUsername = JSON.parse(localStorage.getItem("username"))

//then we create a writable store and store the user from localstore
//and export it - writable allows user to can be updated and readed. 
export const user = writable(saveUser || null);
export const userN = writable(savedUsername || null)
