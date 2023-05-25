<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user.js"
    
    let data = "";
    let manifacturer = "";
    let model = "";
    let year = "";
    let engine = "";
    let power = "";
    let weight = "";
    let minimun_price = "";
    let type = "";



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

    async function handleCreateMc(){
        const response = await fetch("/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({manifacturer: manifacturer, model: model, year: year, engine: engine, power: power, weight: weight, minimum_price: minimum_price, type: type})
        })
    }
    

</script>



<div class="body-container">
    <h1>Harleys for sale</h1>
    {#if data}
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="src/assets/images/2023-softail-standard-010-motorcycle-01.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{data.allMC[0].model}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/auction" class="btn btn-primary">Send Email</a>
        </div>
    </div>
    {/if}
</div>

<!--<script>
    let name = '';
    let email = '';
  
    async function handleSubmit() {
      const response = await fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        console.log('Document created successfully');
      } else {
        console.error('Failed to create document');
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
  
    <label>
      Email:
      <input type="email" bind:value={email} />
    </label>
  
    <button type="submit">Create Document</button>
  </form>
  


<style>
    h1{
        margin: 2%;
    }
</style>-->