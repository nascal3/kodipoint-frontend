import Vue from 'vue'
import Router from 'vue-router'
import { checkAuth, checkToken } from '@/services/authGuards'
import Login from '@/pages/Login'
import About from '@/pages/About'
import Summary from '@/pages/Summary'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: checkToken
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
      beforeEnter: checkAuth
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
