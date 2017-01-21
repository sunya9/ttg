import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    consumerKey: null,
    consumerSecret: null,
    type: null,
    accessToken: null,
    accessTokenSecret: null
  },
  mutations: {
    updateValue(state, { name, value }) {
      state[name] = value
    },
    changeType(state, type) {
      state.type = type
    }
  }
})