<template>
  <div id="app">
    <!-- .shadow -->
    <nav class="navbar navbar-light sticky-top bg-light flex-md-nowrap p-1 navbar-top">
      <!-- <h2>Inventory App</h2> -->
      <button class="btn">
        <svg class="feather">
          <use xlink:href="@/assets/feather-sprite.svg#menu"/>
        </svg>
      </button>
    </nav>

<!-- Для отображения формы входа -->
<!-- <router-view v-if="!isLog" @checkAuthAgain="checkAuth()"/> -->
<!-- Ниже в див v-show="isLog" -->
    <div  class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="sidebar-sticky pt-5">
            <div class="prifile">
              <div class="user-avatar">
                <img src="" alt="">
              </div>
              <div class="user-name">
                <h5>Admin</h5>
              </div>
            </div>
            <hr>
            <ul class="nav flex-column">
              <router-link to="/">Dashboard</router-link>
               <router-link to="/users">Users</router-link>
              <!-- <router-link to="/items" params="{folder: 'all'}">items</router-link> -->
              <li>Administration</li>
              <li>Settings</li>
              <button @click="logOut()">Log out</button>
            </ul>
            <!-- <button class="btn">Log out
              <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#log-out"/>
              </svg>
            </button> -->
          </div>
        </nav>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <Folder folderName="Hwllo"/>
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
      // isLog: false
    // mypop: 'asdfasd'
    }
  },
  methods:{
    // hi(){
    //   fetch('api/hi',{
    //     headers:{
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   }).then(res=>{
    //     var s= res
    //     console.log(s)

    //     return s.json()
    //   }).then(data=>{
    //     console.log(data)
    //     this.items = data
    //   })
    // }
    // checkAuth(){
    //     this.requests.checkAuthorization().then(data=>{
    //       console.log(data)
    //       this.isLog = data
    //     })
    // },
    logOut(){
      //Просто удаляем с хранилища браузера токен, и отправляем пустой заголовок Authorization
      //В итоге нас сервер не пускает
      // localStorage.hash = ''
      // this.$root.isAuth = false
      // this.$router.push('login')
      // this.requests.checkAuthorization().then(data=>{
      //  console.log(data)
      //  this.isLog = data
      //  })
      localStorage.refreshToken = ''
      localStorage.accessToken = ''
      this.$root.refreshToken = ''
      this.$root.accessToken = ''
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
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
body {
  font-size: .875rem;
  
}
@media(prefers-color-scheme: light){
  body{
    background-color: white;
    color: rgb(28, 29, 30);
  }
}
@media(prefers-color-scheme: dark){
  body{
    background-color:rgb(28, 28, 30);
    color: white;
  }
  /* .folder{
    background-color: rgb(44, 44, 46) !important;
    color: white;
  } */
  #sidebarMenu{
    background-color:rgb(44, 44, 46) !important;
  }
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
/* Profile */
.prifile{
  display: flex;
  align-items: center;
}
.user-avatar{
  background-color: #aeaeae;
  height: 50px;
  width: 50px;
  border-radius: 30px;
}
.user-name{
  padding-left: 1rem;
}
.user-name h5{
  margin: 0;
}


/* 
 * Sidebar
 */


.navbar-top{
    display: none;
  }
@media (max-width: 767.98px) {
  .navbar-top{
    display: block;
  }
}
a{
  color:#2c3e50;
  font-weight: 700;
}
a.router-link-active{
  color:#0080ff;
}
#sidebarMenu{
  border-radius: 20px;
  top: 7px;
  left: 7px;
  bottom: 7px;
  height: calc(100vh - 14px);
  position: fixed;
}

.sidebar-sticky {
  position: relative;
  /* top: 0; */
  /* height: calc(100vh - 48px); */
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
