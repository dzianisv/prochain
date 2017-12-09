import Vue from 'vue'
import Router from 'vue-router'

import Authentication from '@/components/pages/Authentication/Authentication'
import Home from '@/components/pages/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }
  ]
})
