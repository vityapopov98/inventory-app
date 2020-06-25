import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'

Vue.use(VueRouter)

const routes =[
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/items/:folder',
        name: 'Items',
        props: true,
        component: Items
    }
]


const router = new VueRouter({
    routes
  })
  
  export default router