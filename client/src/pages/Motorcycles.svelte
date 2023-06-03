<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user.js"
    import CreateForm from "../components/motorcycles/CreateForm.svelte";
    import { motorcyclesStore } from "../store/motorcycleStore";
    import { getMotorcycles } from "../store/motorcycleStore";
    import { navigate } from "svelte-navigator";
    
    let motorcycles = [];
    let manufacturer = "";
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

    onMount(async() => {
        motorcycles = await getMotorcycles();

        const unsubscribe = motorcyclesStore.subscribe(value => {
            motorcycles=value;
        });
        return unsubscribe;
    })

    function handleUpdateButtonClick(motorcycle){
        showUpdateForm = true;
        updatingMotorcycleId = motorcycle._id;
        manufacturer = motorcycle.manufacturer;
        model = motorcycle.model;
        year = motorcycle.year;
        engine = motorcycle.engine;
        power = motorcycle.power;
        weight = motorcycle.weight;
        minimum_price = motorcycle.minimum_price;
        type = motorcycle.type;
    }

    async function handleUpdate(id){
        try{
            const updateMotorcycle = {
                manufacturer,model,year,engine,power,weight,minimum_price,type
            }

            const response = await fetch($BASE_URL + "/api/update-motorcycle/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updateMotorcycle),
                credentials: "include"
            });

            if(response.ok){
                motorcycles = motorcycles.map(motorcycle => {
                    if(motorcycle._id === id){
                        return {
                            ...updateMotorcycle,
                            owner: motorcycle.owner
                        };
                    }
                    return motorcycle;
                })
            }

        }catch(error){
            console.log(error)
        }
    }

    async function handleDelete(id){
        const confirmed = window.confirm("Are you sure you want to delete this Motorcycle?")
        if(!confirmed){
            return
        }
        try{
            const response = await fetch($BASE_URL + "/api/delete-motorcycle/" + id, {
                method: "DELETE",
                credentials:"include"
            });

            console.log(response)
            if(response.ok){
                console.log(`Motorcycle with id ${id} was deleted`)
                motorcycles = motorcycles.filter(m => m._id !== id)
            }

        }catch(error){
            console.error("ERROR has occured while trying to delete motorcycle:", error)
        }
    }

    function goToAuctionPage(motorcycleId){
        console.log(motorcycleId, "Michael vil id!!!")
        navigate(`/auction/${motorcycleId}`)
    }

</script>

<div class="outer-body-container">
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
                        <input type="text" class="form-control" bind:value={manufacturer} required>
                        <p class="card-text">Year:</p>
                        <input type="text" class="form-control" bind:value={year} required>
                        <p class="card-text">Engine:</p>
                        <input type="text" class="form-control" bind:value={engine} required>
                        <p class="card-text">Power:</p>
                        <input type="text" class="form-control" bind:value={power} required>
                        <p class="card-text">Weight:</p>
                        <input type="text" class="form-control" bind:value={weight} required>
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
                <p class="card-text">Manifacturer: {motorcycle.manufacturer}</p>
                <p class="card-text">Year: {motorcycle.year}</p>
                <p class="card-text">Engine: {motorcycle.engine}</p>
                <p class="card-text">Power: {motorcycle.power}</p>
                <p class="card-text">Weight: {motorcycle.weight}</p>
                <p class="card-text">Minimum Price: {motorcycle.minimum_price}</p>
                <p class="card-text">Owned by:<br>{motorcycle.owner}</p>
                {#if $user === motorcycle.owner}
                    <div class="button-container">
                        <button class="btn btn-primary" type="button" on:click={() => {handleUpdateButtonClick(motorcycle)}}>Update</button>
                        <button class="btn btn-primary" type="button" on:click|preventDefault={()=> {handleDelete(motorcycle._id)}}>Delete</button>
                    </div>
                {:else}
                <button class="btn btn-primary" on:click={() => goToAuctionPage(motorcycle._id)}>Go the Auction</button>
                {/if}
              </div>
          </div>
          {/if}
          {/each}
        </div>
    </div>
</div>

<CreateForm/>

<style>
    h1{
        margin: 2%;
    }
    .card{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
</style>