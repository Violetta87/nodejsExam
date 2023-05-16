<script>
    import { BASE_URL } from "../store/base_url.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../store/user.js";
    import toastr from "toastr";

    const navigate = useNavigate();
    const location = useLocation();

    let email = "";
    let password = "";

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


</script>

<div class="login-form">
    <h2>Sign In</h2>
  
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
      <div><a href="/">Click here if you want to sign up</a></div>
    </form>
  </div>
  
  <style>
    .login-form {
      max-width: 400px;
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
      width: 100%;
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
  </style>
  

