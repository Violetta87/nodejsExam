<script> 
    import { user } from "../store/user.js"
    import { BASE_URL } from "../store/base_url.js";
    import toastr from "toastr";

    let firstname="";
    let lastname="";
    let tlf="";
    let address="";
/**
 * async function checkProfileInfo(){
        try{
            
        }
    }
 */
    

    async function addInfoProfile(){
        try{
            const response = await fetch($BASE_URL + "/profile-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({firstname: firstname, lastname: lastname, tlf: tlf, address: address}),
                credentials: "include"
            })
            const data = await response.json();
            console.log(data)
            if(response.status ===200){
                toastr.success(data.message);
                setTimeout(()=> {
                    firstname="";
                    lastname="";
                    tlf="";
                    address="";
                },1000)
            }  
        } 
        catch(error){
            toastr.error("Something went wrong.", error)
        }
    }

    
</script>

<div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold"></span><span class="text-black-50">{$user}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <form on:submit|preventDefault={addInfoProfile}>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Firstname</label><input type="text" class="form-control" placeholder="first name" bind:value={firstname} required></div>
                        <div class="col-md-6"><label class="labels">Lastname</label><input type="text" class="form-control" placeholder="lastname" bind:value={lastname} required></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter tlf number" bind:value={tlf} required></div>
                        <div class="col-md-12"><label class="labels">Address</label><input type="text" class="form-control" placeholder="enter address line 1" bind:value={address} required></div>
                    </div>
                    <div class="row mt-3">
                    </div>
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                </form>
            </div>
        </div>
        
    </div>
</div>

<style>

</style>
