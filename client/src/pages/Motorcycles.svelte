<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/base_url";
    
    let data = "";

    async function getMCs(){
        try{
            const response = await fetch($BASE_URL+ "/harleys");
            console.log(response)
            data = await response.json();
            console.log(data)
            console.log(data.allMC[0].model)

            return data;
        }
        catch(error){
            console.log(error);

        }  

    }
    onMount(()=> {
        getMCs();
    })

</script>



<div class="body-container">
    <h1>Harleys for sale</h1>
    {#if data}
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{data.allMC[0].model}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/auction" class="btn btn-primary">Go the auction</a>
        </div>
    </div>
    {/if}
</div>

<style>
    h1{
        margin: 2%;
    }
</style>
