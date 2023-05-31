<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user.js"
    import CreateForm from "../components/motorcycles/CreateForm.svelte";
    
    let motorcycles = [];
    let manifacturer = "";
    let model = "";
    let year = "";
    let engine = "";
    let power = "";
    let weigth = "";
    let minimum_price = "";
    let type = "";
    let owner = $user;
    let updatingMotorcycleId= null;
    let showUpdateForm = false;

    async function getMCs(){
        try{
            const response = await fetch($BASE_URL+ "/api/motorcycles");
            const dataResponse = await response.json();
            motorcycles = dataResponse.allMC;
            return motorcycles;
        }
        catch(error){
            console.log(error);
        }  
    }

    onMount(()=> {
        getMCs();
    })

    function handleUpdateButtonClick(motorcycle){
        showUpdateForm = true;
        updatingMotorcycleId = motorcycle._id;
        manifacturer = motorcycle.manifacturer;
        model = motorcycle.model;
        year = motorcycle.year;
        engine = motorcycle.engine;
        power = motorcycle.power;
        weigth = motorcycle.weigth;
        minimum_price = motorcycle.minimum_price;
        type = motorcycle.type;
    }

    async function handleUpdate(id){
        try{
            const updateMotorcycle = {
                manifacturer,model,year,engine,power,weigth,minimum_price,type
            }

            const response = await fetch($BASE_URL + "/api/update-motorcycle/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updateMotorcycle),
                credentials: "include"
            });

        }catch(error){
            console.log(error)
        }

        location.reload();
    }

    async function handleDelete(id){
        const confirmed = window.confirm("Are you sure you want to delete this Motorcycle?")
        if(!confirmed){
            return
        }
        try{
            const response = await fetch($BASE_URL + "/api/delete-motorcycle/" + id, {
                method: "DELETE"
            });
            if(response.ok){
                console.log(`Motorcycle with id ${id} was deleted`)
            }

        }catch(error){
            console.error("ERROR has occured while trying to delete motorcycle:", error)
        }
        location.reload();

    }
</script>
  

<div class="body-container">
    <h1>Motorcycles for sale</h1>
    <div class="card-container">
      {#each motorcycles as motorcycle}
      {#if showUpdateForm && motorcycle._id === updatingMotorcycleId}
        <div class="card" style="width: 18rem;">
            <form on:submit|preventDefault={() => handleUpdate(motorcycle._id)}>
                <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="image">
                <div class="card-body">
                    <h5 class="card-title">Model:</h5>
                    <input type="text" class="form-control" bind:value={model} required>
                    <p class="card-text">Manifacturer:</p>
                    <input type="text" class="form-control" bind:value={manifacturer} required>
                    <p class="card-text">Year:</p>
                    <input type="text" class="form-control" bind:value={year} required>
                    <p class="card-text">Engine:</p>
                    <input type="text" class="form-control" bind:value={engine} required>
                    <p class="card-text">Power:</p>
                    <input type="text" class="form-control" bind:value={power} required>
                    <p class="card-text">Weight:</p>
                    <input type="text" class="form-control" bind:value={weigth} required>
                    <p class="card-text">Minimum Price:</p>
                    <input type="text" class="form-control" bind:value={minimum_price} required>
                    <p class="card-text">Owned by:</p>
                    <input type="text" class="form-control" bind:value={owner} required>
                    <div class="button-container">
                        <button class="btn btn-primary" type="submit">submit update</button>
                        <button class="btn btn-primary" type="button" on:click|preventDefault={()=> {handleDelete(motorcycle._id)}}>Delete</button>
                    </div>
                </div>
            </form>
        </div>
        {:else}
      <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="image">
          <div class="card-body">
            <h5 class="card-title">Model: {motorcycle.model}</h5>
            <p class="card-text">Manifacturer: {motorcycle.manifacturer}</p>
            <p class="card-text">Year: {motorcycle.year}</p>
            <p class="card-text">Engine: {motorcycle.engine}</p>
            <p class="card-text">Power: {motorcycle.power}</p>
            <p class="card-text">Weight: {motorcycle.weigth}</p>
            <p class="card-text">Minimum Price: {motorcycle.minimum_price}</p>
            <p class="card-text">Owned by: {motorcycle.owner}</p>
            {#if $user === motorcycle.owner}
                <div class="button-container">
                    <button class="btn btn-primary" type="button" on:click={() => {handleUpdateButtonClick(motorcycle)}}>Update</button>
                    <button class="btn btn-primary" type="button" on:click|preventDefault={()=> {handleDelete(motorcycle._id)}}>Delete</button>
                </div>
            {:else}
            <a href="/auction" class="btn btn-primary">Send Email</a>
            {/if}
          </div>
      </div>
      {/if}
      {/each}
    </div>
</div>

<CreateForm/>


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