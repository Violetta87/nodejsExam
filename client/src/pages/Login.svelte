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
        email="";
        password="";
        }, 1000);   
    }else{
        toastr.error(data.message)
        console.log("error")
    }
}


async function handleSignup(){

  try{
    if(password!=passwordReperat){
      toastr.error("password does not match")
    }

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
        i=0;
        username="";
        email="";
        password="";
        passwordReperat="";
      },1000)
    }

  }

  }catch(error){
    console.log(error)
  }
}


</script>

<div class="centered-container">
  <div class="login-form">
    <div class="container">
      <div class="header">
        <h2 class={i===0 ? "login active" : "login"}>Login</h2>
        <h2 class={i===1 ? "signup active" : "signup"}>Sign Up</h2>
      </div>
      <div class="container-range">
        <div class="range-container">
          <input class="range" type="range" bind:value={i} max="1">
        </div>
      </div>
      <div class="form-container">
        {#if i === 0}
          <!-- Login Form -->
          <div class="login-container">
            <form on:submit|preventDefault={validateLogin}>
              <div class="form-field-form">
                <div class="form-field">
                  <label for="email" class="input-text">Email</label>
                  <input type="text" placeholder="Email" name="email" bind:value={email} required>
                </div>
                <div class="form-field">
                  <label for="password" class="input-text">Password</label>
                  <input type="password" placeholder="Password" name="password" bind:value={password} required>
                </div>
              </div>
              <div class="button-field">
                <div class="form-field" id="form-button">
                  <button type="submit">Login</button>
                  <div><a href="/">Forgot Password</a></div>
                </div>
              </div>
            </form>
          </div>
        {/if}
        {#if i === 1}
          <!-- Signup Form -->
          <div class="signup-container">
            <form on:submit|preventDefault={handleSignup}>
              <div class="form-field-form">
                <div class="form-field">
                  <label for="username" class="input-text">Username</label>
                  <input type="text" placeholder="Username" name="username" bind:value={username} required>
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
                  <label for="passwordRepeat" class="input-text">Repeat password</label>
                  <input type="password" placeholder="Repeat Password" name="passwordRepeat" bind:value={passwordReperat} required>
                </div>
              </div>
              <div class="button-field">
                <div class="form-field">
                  <button type="submit">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>


  
  <style>
    .login-form {
      max-width:60vw;
      min-width: 60vw;
      height: 80vh;
      margin:  auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5f5f5;
      justify-content: space-between;
      
    }

    .form-container{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  
    .form-field {
      margin-bottom: 20px;
    }
  
    .form-field label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      margin-left: 5vw;
    }
  
    .form-field input[type="text"],
    .form-field input[type="password"] {
      width: 80%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-left:5vw;
    }
  
    .form-field > button[type="submit"] {
      display: block;
      width: 70%;
      padding: 8px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      margin-left:8vw;
    }
    .form-field-form{
      height: 55vh;
    }
    .button-field{
      height: 5vh;
    }

    a{
      margin-left: 18vw;
    }

    .login-form{
        background-color: pink;
    }

    .container-range{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .range-container{
      display: flex;
      justify-content: center;
      margin: 0 auto;
      width: 50%;
    }

    input[type="range"] {
        height: 10px;
        width: 100%;
        max-width: 200px;
        margin-left: auto;
        margin-right: auto;
        background-color: #ccc;
        border:none;
        outline: none;
        padding: 0;
        appearance: none;
        border-radius: 5px;
        appearance: none;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        background: #ccc;
        border-radius: 5px;
    }

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

    .container{
      display: flex;
      flex-direction: column;
    }

    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .signup{
      margin: auto;
      margin-right: 2vw;
    }

    .login{
      margin-right: 2vw;
    }

    .range{
      align-items: center;
      align-content: center;
      margin-left: 5em;
    }

    .login.active{
      color:#007bff;
    }
    .signup.active{
      color:#007bff;
    }
  

  </style>



  

