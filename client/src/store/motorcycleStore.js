import { writable } from "svelte/store";

const initialMotorcycles = [];

const url = "http://localhost:3000"

export let motorcyclesStore;
let motorcycles;

export async function getMotorcycles(){
    try{
        const response = await fetch(url+ "/api/motorcycles");
        const dataResponse = await response.json();
        const motorcycles = dataResponse.allMC;
        motorcyclesStore.set(motorcycles);
        return motorcycles;
    }
    catch(error){
        console.log(error);
    }  
}

export async function getMotorcycleById(id){
    try{
        const response = await fetch(url + "/api/motorcycle/" + id)
        const dataResponse = await response.json();
        const motorcycleById = dataResponse.motorcycle;
        return motorcycleById;
    }
    catch(error){
        console.log(error);
    }
}

motorcyclesStore = writable(initialMotorcycles, () => {
    const unsubscribe = motorcyclesStore.subscribe(value => {
        motorcycles=value;
    });
    return unsubscribe;
});
