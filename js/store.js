import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // consumerKey: null,
    // consumerSecret: null,
    consumerKey: '1sUHbjkShqIdQXixuZNppocOQ',
    consumerSecret: 'fjejY8y2YaycOBowM4xhotpGvTo1clxfTjtBy7GTvCrmX1MTqG',
    type: 'callback',
    accessToken: null,
    accessTokenSecret: null,
    // type: null,
    loaded: false
  },
  mutations: {
    loaded(state) {
      state.loaded = true
    },
    updateValue(state, { name, value }) {
      state[name] = value
    }
  }
})