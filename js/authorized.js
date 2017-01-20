import { mapState } from 'vuex'

import mixin from './base'

const template = `
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
`

const keys = ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret', 'type']

export default {
  mixins: [mixin],
  template,
  computed: mapState(keys.reduce((obj, key) => {
    obj[key] = state => state[key]
    return obj
  }, {})),
  updated() {
    if(!this.type) {
      this.$store.commit('updateValue', {
        name: 'type',
        value: 'callback'
      })
    }
  },
  methods: {
    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }
  }
}