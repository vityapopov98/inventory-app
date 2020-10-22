import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
// import requests from '../requests'  //Запросы

Vue.use(VueRouter)

const routes =[
    {
        path: '*',
        name: 'Login',
        component: Login
      },
    //   {
    //     path: '/',
    //     name: 'Login',
    //     component: Login
    //   },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/items/:from',
        name: 'Items',
        props: true,
        component: Items
    },
    {
        path: '/users',
        name: 'Users',
        component: Users
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
]


const router = new VueRouter({
    routes
  })

// Я так понимаю сервер сам будет решать пускать или не пускать, или правильнее сказать выдавать страницу или нет  
//   router.beforeEach((to, from, next)=>{
//     // var currentUser = '';
//     // console.log(currentUser)
//     requests.checkAuthorization().then(data=>{
//       const currentUser = data // currentUser = true/false
      
//       console.log('cur user ', currentUser)
      
//       const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
//       if (requiresAuth && !currentUser){ next('login'); console.log('NOOO')} 
//       else if (!requiresAuth && currentUser) {next('home'); console.log('welcome Home')}
//       else {next(); console.log('here')}
//       // next(); console.log('here')
      
//     })
//   })
  
  export default router