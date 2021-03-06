import Vue from 'vue'
import Router from 'vue-router'
import { checkAuth, checkToken } from '@/services/authGuards'
import Login from '@/pages/Login'
import Landlords from '@/pages/Landlords'
import Summary from '@/pages/Properties'
import Tenants from '@/pages/Tenants'
import Profile from '@/pages/Profile'

Vue.use(Router)

export default new Router({
  // base: '/system',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: checkToken
    },
    {
      path: '/landlords',
      name: 'landlords',
      component: Landlords,
      beforeEnter: checkAuth
    },
    {
      path: '/properties',
      name: 'properties',
      component: Summary,
      beforeEnter: checkAuth
    },
    {
      path: '/tenants',
      name: 'tenants',
      component: Tenants,
      beforeEnter: checkAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: checkAuth
    }
  ]
})
