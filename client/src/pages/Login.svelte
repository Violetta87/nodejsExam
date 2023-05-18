<script>
    import { BASE_URL } from "../store/base_url.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../store/user.js";
    import toastr from "toastr";

    const navigate = useNavigate();
    const location = useLocation();

    let email = "";
    let password = "";
    let i = 0;
    let username= "";
    let passwordReperat="";

   async function validateLogin(){
    const response = await fetch($BASE_URL + "/login", {
        method:"POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password}),
        credentials: "include"
    });
    console.log(response)
   
    //parser det til javascript object
    const data = await response.json();

    console.log(data)

    
    if(data.status===200){
        const authenticatedEmail = data.user;
        localStorage.setItem("user", JSON.stringify(data.user))
        user.set(data.user);
        toastr.success(`hiiii ${authenticatedEmail}`);

        setTimeout(()=> {
            const from = ($location.state && $location.state.from) || "/";
		    navigate(from, { replace: true });
        }, 1000);   
    }else{
        toastr.error(data.message)
        console.log("error")
    }
}


async function handleSignup(){

  try{
    if(password===passwordReperat){
      const response = await fetch($BASE_URL + "/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username: username, email: email, password: password}),
      credentials: "include"
    })

    const data = await response.json();
    if(response.status === 200){
      toastr.success(data.message);
      setTimeout(() => {
        i=0
      },1000)
    }

  }

  }catch(error){
    console.log(error)
  }
}


</script>

<div class="login-form">
  <div class="container">
    
    <div id="headlines">
      <h2>Login</h2>
      <h2>Sign Up</h2>
    </div>
    <label>
      <input class="range" type="range" bind:value={i} max="1">
  </label>
  </div>
  
  {#if i == 0}
      <h2>Login</h2>
      <form on:submit|preventDefault={validateLogin}>
          <div class="form-field">
              <label for="email" class="input-text">Email</label>
              <input type="text" placeholder="Email" name="email" bind:value={email} required>
          </div>
      
          <div class="form-field">
              <label for="password" class="input-text">Password</label>
              <input type="password" placeholder="Password" name="password" bind:value={password} required>
          </div>
      
          <div class="form-field">
              <button type="submit">Login</button>
          </div>
          <div><a href="/">Forgot Password</a></div>
      </form>
  {:else}
      <h2>Sign Up</h2>
      <form on:submit|preventDefault={handleSignup}>
          <div class="form-field">
            <label for="text" class="input-text">Username</label>
            <input type="text" placeholder="Email" name="email" bind:value={username} required>
          </div>
          <div class="form-field">
              <label for="email" class="input-text">Email</label>
              <input type="text" placeholder="Email" name="email" bind:value={email} required>
          </div>
      
          <div class="form-field">
              <label for="password" class="input-text">Password</label>
              <input type="password" placeholder="Password" name="password" bind:value={password} required>
          </div>
          <div class="form-field">
            <label for="password" class="input-text">Repeat password</label>
            <input type="password" placeholder="Password" name="password" bind:value={passwordReperat} required>
        </div>

      
          <div class="form-field">
              <button type="submit">Sign Up</button>
          </div>
      </form>
  {/if}
</div>
  
  <style>
    .login-form {
      max-width:600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5f5f5;
    }
  
    .form-field {
      margin-bottom: 20px;
    }
  
    .form-field label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    .form-field input[type="text"],
    .form-field input[type="password"] {
      width: 80%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  
    .form-field > button[type="submit"] {
      display: block;
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }

    .login-form{
        background-color: pink;
    }

    /* Custom styling for the range input */
    input[type="range"] {
        /* Set the height and width */
        height: 10px;
        width: 50%;

        /* Remove default styles */
        appearance: none;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;

        /* Adjust track color */
        background: #ccc;
        border-radius: 5px;

        /* Adjust thumb appearance */
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background-color: #007bff;
            border-radius: 50%;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background-color: #007bff;
            border-radius: 50%;
            cursor: pointer;
        }
    }

    .container{
      display: flex;
      flex-direction: column;
    }

    #headlines{
      display: flex;
      flex-direction: row;
    }

    .range{
      align-items: center;
      align-content: center;
    }

</style>



  

