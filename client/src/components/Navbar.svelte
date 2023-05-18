<script>
    import { Router, Link, Route } from "svelte-navigator"
    import Login from "../pages/Login.svelte";
    import Motorcycles from "../pages/Motorcycles.svelte";
    import Auction from "../pages/Auction.svelte";
    import { BASE_URL } from "../store/base_url";
    import { user } from "../store/user";
    import toastr from "toastr";
    import PrivateRoute from "../privateRoutes/PrivateRoute.svelte";

    async function logout(){
      const response = await fetch($BASE_URL + "/log-out", {
        method: "POST"
      })
      const data = response.json();
      if(response.status === 200){
        toastr.success("bye")
        localStorage.removeItem("user")
        user.set(null);
        $user = null;
      }else{
        
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
                <a class="nav-link active" aria-current="page" href="/profile">Profile</a>
              </li>
              <li class="nav-item">
                <Link to="/auction">Auktion</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Motorcykler</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/">Yamaha</a></li>
                  <li><a class="dropdown-item" href="/">Suzuki</a></li>
                  <li><a class="dropdown-item" href="/">Kawasaki</a></li>
                  <li><a class="dropdown-item" href="/">Honda</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="/">BMW</a></li>
                  <li><a class="dropdown-item" href="/">Ducati</a></li>
                  <li class="dropdown-item"><Link to="/harleys">Harley</Link></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="/">Forum</a>
              </li>
            </ul>
            <form class="d-flex form-group" role="search">
              <input class="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div class="d-flex login-signup">
              {#if $user}  <!-- Check if user is logged in -->
                <button class="btn btn-outline-success" on:click={logout}>SignOut</button>
              {:else}
                <button class="btn btn-outline-success"><Link to="/login">Login</Link></button>
              {/if}
            </div>
          </div>
        </div>
      </nav>

      <Route path="/login" component={Login}></Route>
      <Route path="/harleys" component={Motorcycles}></Route>
      <PrivateRoute path="/auction">
        <Auction/>
      </PrivateRoute>

</Router>

