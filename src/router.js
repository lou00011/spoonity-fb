import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import UserDetails from './views/UserDetails.vue'
//
import { isSessionAuthenticated } from '../src/logic/firebaseUtils'

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userdetails',
      name: 'User Details',
      component: UserDetails
    }
  ]
})
// Navigation guards. Before each routering check auth status of the session. Redirect to login if session is not authorized
router.beforeEach((to, from, next) => {
  isSessionAuthenticated() === false && (to.path !== '/login' && to.path !== '/register') ? next('/login') : next()
})

Vue.use(Router)
