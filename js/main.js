import Vue from 'vue'
import VueRouter from 'vue-router'

import InputKey from './input-key'
import Authorize from './authorize'
import Authorized from './authorized'
import ring from '../img/ring.gif'

Vue.use(VueRouter)

Vue.partial('progress', `<span class="spinner"><img src="${ring}" width="20" height="20" alt="" /> <span>処理中です…。</span></span>`)

const router = new VueRouter().map({
    '/input-key': {
      component: InputKey,
      name: 'input-key'
    },
    '/authorize': {
      component: Authorize,
      name: 'authorize'
    },
    '/authorized': {
      component: Authorized,
      name: 'authorized'
    }
  }).redirect({
    '/': '/input-key',
    '*': '/'
  })

const App = Vue.extend({
  data() {
    return {
      consumerKey: null,
      consumerSecret: null,
      accessToken: null,
      accessTokenSecret: null,
      type: null
    }
  },
  methods: {
    isCurrent(name) {
      return this.$route.name === name ? 'current' : ''
    }
  }
})

router.start(App, '#app')
