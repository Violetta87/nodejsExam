<script>
    import { Router, Link, Route } from "svelte-navigator"
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
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="/">Auktions oversigt</a>
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
                  <li><a class="dropdown-item" href="/">Harley Davidson</a></li>
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
                <button class="btn btn-outline-success">Login</button>
                <button class="btn btn-outline-success">Signup</button>
            </div>
          </div>
        </div>
      </nav>
</Router>

