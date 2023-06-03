<script>
    import { motorcyclesStore, getMotorcycles, getMotorcycleById } from "../store/motorcycleStore.js";
    import { onMount } from "svelte";
    import toastr from "toastr";
 
    export let id = null;
    let searchQuery = '';
    let motorcycleList = [];
    let bid;
    let motorcycle;

    onMount( async() =>{
        motorcycleList = await getMotorcycles();
        console.log(motorcycleList)
        motorcycle = motorcycleList.find(motorcycle => motorcycle._id === id);
        console.log(motorcycle, "motorcycle")

        if(id){
            motorcycle = motorcycleList.find(motorcycle => motorcycle._id === id);  
        }

        const unsubscribe = motorcyclesStore.subscribe((value) => {
            motorcycleList = value;
        });
        return unsubscribe;
    })

    function search(){
        if(searchQuery.trim() === ''){
            motorcycleList = [];
            toastr.error("Sorry theres no such motorcycle for sale with that manufacturer.")
        }

        motorcycleList = motorcycleList.filter(motorcycle =>
        motorcycle.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()));
        const count = motorcycleList.length
        console.log(count)

        if(count == 0){
            toastr.success(`Found ${count} motorcycle for sale with that manufacturer: ${motorcycleList.manufacturer}`)
            console.log(motorcycleList)
        }

        if(count > 0){
            toastr.success(`Found ${count} motorcycles for sale with that manufacturer: ${motorcycleList.manufacturer}`)
            console.log(motorcycleList)
        }
    }

    function submitBit(){
        console.log("hej")
    }

</script>


<div class="outer-body-container">
    <div class="body-container">
        <h1>Auction</h1>
        <div class=search-container>
            <h4>Search a manufacturer</h4>
            <form on:submit|preventDefault={search} class="d-flex form-group" role="search">
                <input class="form-control me-2 search-input" type="search" bind:value={searchQuery} placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        <br><br>
        <div class="card-container">
            {#if id && motorcycle}
                <div class="card" style="width: 18rem;">
                    <form on:submit|preventDefault={submitBit}>
                        <div class="card-body">
                            <img class="card-img-top" src="/src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="image">
                            <h5 class="card-title">{motorcycle.manufacturer}</h5>
                            <p class="card-text">Model: {motorcycle.model}</p>
                            <p class="card-text">owned by: {motorcycle.owner}</p>
                            <p class="card-text">minimum_price: {motorcycle.minimum_price}</p>
                            <input type="price" class="form-control" bind:value={bid} required>
                            <div class="button-container">
                                <button class="btn btn-primary" type="submit">submit bid</button>
                            </div>
                        </div>
                    </form>
                </div>
                {:else}
                    {#each motorcycleList as motorcycle}
                    <div class="card" style="width: 18rem;">
                        <form on:submit|preventDefault={submitBit}>
                            <img class="card-img-top" src="/src/assets/images/background-pink-bike.jpg" alt="image">
                            <div class="card-body">
                                <h5 class="card-title">{motorcycle.manufacturer}</h5>
                                <p class="card-text">Model: {motorcycle.model}</p>
                                <p class="card-text">owned by: <br> {motorcycle.owner}</p>
                                <p class="card-text">minimum_price: {motorcycle.minimum_price}</p>
                                <input type="price" class="form-control" bind:value={bid} required>
                                <br>
                                <div class="button-container">
                                    <button class="btn btn-primary" type="submit">submit bid</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/each}
                {/if}      
        </div>
    </div>  
</div>

<style>

.card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 2%;
}

</style>
