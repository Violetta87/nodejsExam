<script> 
    import { user } from "../store/user.js"
    import { BASE_URL } from "../store/base_url.js";
    import toastr from "toastr";
    import { onMount } from "svelte";

    let firstname="";
    let lastname="";
    let tlf="";
    let address="";
    let hasProfileInfo;
    let profileId;

    async function isThereProfileInfo(){
        try{
            const response = await fetch($BASE_URL + "/api/profile-info-by-email", {credentials: "include"});
            const profileInfo = await response.json();

            if(response.status === 200){
                firstname = profileInfo.user[0].firstname;
                lastname = profileInfo.user[0].lastname;
                tlf = profileInfo.user[0].tlf;
                address = profileInfo.user[0].address;
                hasProfileInfo=1;
                profileId = profileInfo.user[0].id
            }else{
                console.log(profileInfo.message);
            }
        }
        catch(error){
            console.error("Error fetching profile info:", error);
            toastr.error("Failed to fetch the profile info")

        }
    }

    async function addProfileInfo(){
        try{
            const response = await fetch($BASE_URL + "/api/profile-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({firstname: firstname, lastname: lastname, tlf: tlf, address: address}),
                credentials: "include"
            })
            const data = await response.json();
            
            if(response.status ===200){
                toastr.success(data.message);
                setTimeout(()=> {
                    firstname = data.firstname,
                    lastname = data.lastname,
                    tlf = data.tlf,
                    address = data.address
                },1000)
            }  
        }

        catch(error){
            toastr.error("Failed to save profile information.", error)
        }
    }

    async function updateProfileInfo(){
        try{
            const updatedProfile = {
                firstname, lastname, tlf, address
            }

            const response = await fetch($BASE_URL + "/api/update-profile/" + profileId, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedProfile),
                credentials: "include"
            });

            if(response.ok){
                toastr.success(`${updatedProfile.firstname} Your account was succesfully updated`)
                return {
                    ...updatedProfile,
                    id: updatedProfile.id
                }
            }


        }catch(error){
            console.error("Error updating profile information:", error);
            toastr.error("Failed to update profile information: ", error);
        }
    }

    onMount( async() =>{
        await isThereProfileInfo();
    })
   
</script>

<div class="outer-body-container">
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" alt="profile-foto" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold"></span><span class="text-black-50">{$user}</span><span> </span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile</h4>
                    </div>
                    {#if hasProfileInfo !=1}
                    <form on:submit|preventDefault={addProfileInfo}>
                        <div class="row mt-2">
                            <div class="col-md-6"><label for="firstname-input" class="labels">Firstname</label><input id="firstname-input" type="text" class="form-control" placeholder="firstname" bind:value={firstname} required></div>
                            <div class="col-md-6"><label for="lastname-input" class="labels">Lastname</label><input id="lastname-input" type="text" class="form-control" placeholder="lastname" bind:value={lastname} required></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label for="tlf-input" class="labels">Mobile Number</label><input id="tlf-input" type="tel" maxlength="8" minlength="8" class="form-control" placeholder="enter tlf number" bind:value={tlf} required></div>
                            <div class="col-md-12"><label for="address-input" class="labels">Address</label><input id="address-input" type="text" class="form-control" placeholder="enter address line 1" bind:value={address} required></div>
                        </div>
                        <div class="row mt-3">
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                    </form>
                    {:else}
                    <form on:submit|preventDefault={updateProfileInfo}>
                        <div class="row mt-2">
                            <div class="col-md-6"><label for="firstname-input" class="labels">Firstname</label><input id="firstname-input" type="text" class="form-control" placeholder="firstname" bind:value={firstname} required></div>
                            <div class="col-md-6"><label for="lastname-input" class="labels">Lastname</label><input id="lastname-input" type="text" class="form-control" placeholder="lastname" bind:value={lastname} required></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label for="tlf-input" class="labels">Mobile Number</label><input id="tlf-input" type="text" class="form-control" placeholder="enter tlf number" bind:value={tlf} required></div>
                            <div class="col-md-12"><label for="address-input" class="labels">Address</label><input id="address-input" type="text" class="form-control" placeholder="enter address line 1" bind:value={address} required></div>
                        </div>
                        <div class="row mt-3">
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Update Profile</button></div>
                    </form>
                    {/if}
    
                </div>
            </div>
            
        </div>
    </div>
</div>



