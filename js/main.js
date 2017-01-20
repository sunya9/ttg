import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'isomorphic-fetch'

import './progress'
import './steps'

import store from './store'
import router from './router'

import '../css/main.css'

sync(store, router)

const vm = new Vue({
  el: '#app',
  router,
  store,
  // data: {
  // },
  mounted() {
    this.$store.commit('loaded')
  },
  computed: {
    loaded() {
      return this.$store.state.loaded
    }
  }
})

window.vm = vm