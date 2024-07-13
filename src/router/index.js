import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import AddSongForm from '../components/forms/AddSongForm'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pages.home',
    component: Home
  },
  {
    path: '/search',
    name: 'pages.search',
    component: Search,
  },
  {
    path: '/add',
    name: 'pages.add',
    components: AddSongForm
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
