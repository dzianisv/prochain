import Vue from 'vue'
import Router from 'vue-router'

import Authentication from '@/components/pages/Authentication/Authentication'
import Events from '@/components/pages/Event/List'
import NewEvent from '@/components/pages/Event/NewEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Events
    }, {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }, {
      path: '/event/new',
      name: 'New event',
      component: NewEvent
    }
  ]
})
