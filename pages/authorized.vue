<template>
  <div>
    <label for="consumer-key">Consumer Key: </label>
    <input type="text" id="consumer-key" readonly @click.prevent="selectAll" v-model="consumerKey" size="60">
    <label for="consumer-secret">Consumer Secret: </label>
    <input type="text" id="consumer-secret" readonly @click.prevent="selectAll"  v-model="consumerSecret" size="60">
    <label for="access-token">Access Token: </label>
    <input type="text" id="access-token" readonly @click.prevent="selectAll"  v-model="accessToken" size="60">
    <label for="access-token-secret">Access Token Secret: </label>
    <input type="text" id="access-token-secret" readonly @click.prevent="selectAll"  v-model="accessTokenSecret" size="60">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'isomorphic-fetch'
import promise from 'es6-promise'
promise.polyfill()


const keys = ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret']
export default {
  computed: mapState(keys.reduce((obj, key) => {
    obj[key] = state => state[key]
    return obj
  }, {})),
  fetch({ req, store, redirect }) {
    if(process.server && req.session) {
      keys.forEach(name => {
        store.commit('updateValue', {
          name,
          value: req.session[name]
        })
      })
    }
    const goHome = !keys.every(key => store.state[key])
    if(goHome) redirect('/')
  },
  methods: {
    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }
  }
}
</script>