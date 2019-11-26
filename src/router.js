import Vue from 'vue'
import Router from 'vue-router'
import { checkAuth, checkToken } from '@/services/authGuards'
import Login from '@/pages/Login'
import About from '@/pages/About'
import Summary from '@/pages/Properties'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: checkToken
    },
    {
      path: '/properties',
      name: 'properties',
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
