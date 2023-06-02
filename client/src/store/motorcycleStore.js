import { writable,readable } from "svelte/store";
import { BASE_URL } from "./base_url";


const initialMotorcycles = [];

const url = "http://localhost:3000"

export const motorcyclesStore = writable(initialMotorcycles, () => {
  // This function will be called when a component subscribes to the store
  return () => {
    // This cleanup function will be called when the component unsubscribes from the store
    // You can perform any necessary cleanup here
  };
});

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
