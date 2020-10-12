import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes =[
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
    }
]


const router = new VueRouter({
    routes
  })
  
  export default router