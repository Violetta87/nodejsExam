<script>
    import { Router, Link, Route } from "svelte-navigator"
    import Login from "../pages/Login.svelte";
    import Motorcycles from "../pages/Motorcycles.svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user";
    import toastr from "toastr";
    import PrivateRoute from "../privateRoutes/PrivateRoute.svelte";
    import Profile from "../pages/Profile.svelte"
    import ChatForum from "../pages/ChatForum.svelte";
    import Auction from "../pages/Auction.svelte";

    async function logout(){
      const response = await fetch($BASE_URL + "/auth/log-out", {
        method: "POST"
      })
      if(response.status === 200){
        toastr.success("byeeeee")
        //localStorage.removeItem("user")
        user.set(null);
        $user = null;
      }else{
        toastr.error("Something went wrong. Try again")
      }
    }
</script>

<Router>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Biker Basen</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
              <li class="nav-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li class="nav-item">
                <Link to="/auction">Auktion</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Motorcykler</a>
                <ul class="dropdown-menu">
                  <li class="dropdown-item"><Link to="/motorcycles">Motorcycles for sale</Link></li>
                </ul>
              </li>
              <li class="nav-item">
                <Link to="/chat-forum">Chat forum</Link>
              </li>
            </ul>
            <div class="d-flex login-signup">
              {#if $user}
                <button class="btn btn-outline-success" on:click={logout}>SignOut</button>
              {:else}
                <button class="btn btn-outline-success"><Link to="/login">Login</Link></button>
              {/if}
            </div>
          </div>
        </div>
      </nav>

      <Route path="/login" component={Login}></Route>
      <Route path="/motorcycles" component={Motorcycles}></Route>
      <PrivateRoute path="/chat-forum">
        <ChatForum/>
      </PrivateRoute>
      <PrivateRoute path="/auction">
        <Auction/>
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <Profile/>
      </PrivateRoute>
      <PrivateRoute path="/auction/:id" let:params>
        <Auction id={params.id}/>
      </PrivateRoute>
</Router>

