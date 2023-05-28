<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user.js"
  import { identity } from "svelte/internal";
    
    let data = [];
    let manifacturer = "";
    let model = "";
    let year = "";
    let engine = "";
    let power = "";
    let weight = "";
    let minimum_price = "";
    let type = "";
    let owner = $user;
    let updatingMotorcycleId= null;
    let showUpdateForm = false;

    async function getMCs(){
        try{
            const response = await fetch($BASE_URL+ "/motorcycles");
            console.log(response)
            const dataResponse = await response.json();
            data = dataResponse.allMC;
            return data;
        }
        catch(error){
            console.log(error);
        }  
    }

    onMount(()=> {
        getMCs();
    })

    async function handleCreateMc(){
        const response = await fetch($BASE_URL + "/create-motorcycles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({manifacturer: manifacturer, model: model, year: year, engine: engine, power: power, weight: weight, minimum_price: minimum_price, type: type, owner: owner}),
            credentials: "include"
        })

        if(response.ok){
            location.reload();
        }
    }

    function handleUpdateButtonClick(motorcycle){
        showUpdateForm = true;
        updatingMotorcycleId = motorcycle._id;
        manifacturer = motorcycle.manifacturer;
        model = motorcycle.model;
        year = motorcycle.year;
        engine = motorcycle.engine;
        power = motorcycle.power;
        weight = motorcycle.weight;
        minimum_price = motorcycle.minimum_price;
    }

    async function handleUpdate(updatingMotorcycleId){
        try{
            const motorcycleToUpdate = data.find((motorcycle) => motorcycle._id ===updatingMotorcycleId);

            manifacturer = motorcycleToUpdate.manifacturer;
            model = motorcycleToUpdate.model;
            year = motorcycleToUpdate.year;
            engine = motorcycleToUpdate.engine;
            power = motorcycleToUpdate.power;
            weight = motorcycleToUpdate.weight;
            minimum_price = motorcycleToUpdate.minimum_price;

            const updateMotorcycle = {
                manifacturer, model,year,engine,power,weight,minimum_price
            }
            const response = await fetch($BASE_URL + "/update-motorcycle/${id}", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updateMotorcycle),
                credentials: "include"
            });

            if(response.ok){
                location.reload();
            }
        }catch(error){
            console.log(error)
        }
    }
</script>
  

<div class="body-container">
    <h1>Motorcycles for sale</h1>
    <div class="card-container">
      {#each data as motorcycle}
      {#if showUpdateForm && motorcycle._id === updatingMotorcycleId}
        <div class="card" style="width: 18rem;">
            <form on:submit|preventDefault={() => handleUpdate(motorcycle._id)}>
                <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Model:</h5>
                    <input type="text" class="form-control" bind:value={motorcycle.model} required>
                    <p class="card-text">Manifacturer:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.manifacturer} required>
                    <p class="card-text">Year:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.year} required>
                    <p class="card-text">Engine:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.engine} required>
                    <p class="card-text">Power:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.power} required>
                    <p class="card-text">Weight:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.weight} required>
                    <p class="card-text">Minimum Price:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.minimum_price} required>
                    <p class="card-text">Owned by:</p>
                    <input type="text" class="form-control" bind:value={motorcycle.owner} required>
                    <div class="button-container">
                        <button class="btn btn-primary" type="submit">submit update</button>
                        <button class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </form>
        </div>
        {/if}
      <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Model: {motorcycle.model}</h5>
            <p class="card-text">Manifacturer: {motorcycle.manifacturer}</p>
            <p class="card-text">Year: {motorcycle.year}</p>
            <p class="card-text">Engine: {motorcycle.engine}</p>
            <p class="card-text">Power: {motorcycle.power}</p>
            <p class="card-text">Weight: {motorcycle.weight}</p>
            <p class="card-text">Minimum Price: {motorcycle.minimum_price}</p>
            <p class="card-text">Owned by: {motorcycle.owner}</p>
            {#if $user === motorcycle.owner}
                <div class="button-container">
                    <button class="btn btn-primary" type="button" on:click={() => {handleUpdateButtonClick(motorcycle)}}>Update</button>
                    <button class="btn btn-primary">Delete</button>
                </div>
            {:else}
            <a href="/auction" class="btn btn-primary">Send Email</a>
            {/if}
          </div>
      </div>
      {/each}
    </div>
</div>

{#if $user}
<div class="body-container">
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="motorcycle_pics"><span class="font-weight-bold"></span><span class="text-black-50">{$user}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Add a Motorcycle</h4>
                </div>
                <form on:submit|preventDefault={handleCreateMc}>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Manifacturer</label><input type="text" class="form-control" placeholder="suzuku" bind:value={manifacturer} required></div>
                        <div class="col-md-6"><label class="labels">Model</label><input type="text" class="form-control" placeholder="z750" bind:value={model} required></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Year</label><input type="text" class="form-control" placeholder="2023" bind:value={year} required></div>
                        <div class="col-md-12"><label class="labels">Engine</label><input type="text" class="form-control" placeholder="cc750" bind:value={engine} required></div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-12"><label class="labels">Power</label><input type="text" class="form-control" placeholder="2023" bind:value={power} required></div>
                      <div class="col-md-12"><label class="labels">Weight</label><input type="text" class="form-control" placeholder="kg" bind:value={weight} required></div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Minimum price</label><input type="number" class="form-control" placeholder="minimum price" bind:value={minimum_price} required></div>
                    <div class="col-md-12"><label class="labels">Type</label><input type="text" class="form-control" placeholder="cruiser" bind:value={type} required></div>
                  </div>
                    <div class="row mt-3">
                    </div>
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Add Motorcycle</button></div>
                </form>
            </div>
        </div>
        
    </div>
  </div>
</div>
{/if}



<style>
    h1{
        margin: 2%;
    }
    .card-container{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
</style>