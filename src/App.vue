<template>
  <div id="app">
    
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <h2>Inventory App</h2>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <router-link to="/">Home</router-link>
              <!-- <router-link to="/items" params="{folder: 'all'}">items</router-link> -->
               <router-link :to="{ name: 'Items', params: { folder: 'гараж' }}">Items new</router-link>
              <li>Folders</li>
              <li>Users</li>
              <li>Settings</li>
            </ul>
          </div>
        </nav>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld folderName="Welcome to Your Vue.js App"/> -->
    <Folder folderName="Hwllo"/>
    <!-- <CreateItem></CreateItem> -->
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Folder from './components/Folder.vue'
// import CreateItem from './components/CreateItem.vue'

export default {
  name: 'App',
  components: {
    Folder, 
    // CreateItem
  },
  data: function(){
    return {
      items:[{
        id: Number,
        name: '',
        description:'',
        image: '',
        purchaseDate: '',
        guarantee: '',
        cost: '',
        count: '',
        storage:''
      },],
    // mypop: 'asdfasd'
    }
  },
  methods:{
    hi(){
      fetch('api/hi',{
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res=>{
        var s= res
        console.log(s)

        return s.json()
      }).then(data=>{
        console.log(data)
        this.items = data
      })
    }
  },
  mounted(){
    // this.hi()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
