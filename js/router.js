import Vue from 'vue'
import VueRouter from 'vue-router'

import InputKey from './input-key'
import Authorize from './authorize'
import Authorized from './authorized'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/input-key',
      component: InputKey,
      name: 'input-key'
    }, {
      path: '/authorize',
      component: Authorize,
      name: 'authorize'
    }, {
      path: '/authorized',
      component: Authorized,
      name: 'authorized'
    }, {
      path: '/',
      redirect: '/input-key'
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})