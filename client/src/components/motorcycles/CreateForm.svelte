<script>
    import { user } from "../../store/user.js"
    import { BASE_URL } from "../../store/base_url.js";

    let manifacturer = "";
    let model = "";
    let year = "";
    let engine = "";
    let power = "";
    let weight = "";
    let minimum_price = "";
    let type = "";

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
</script>

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