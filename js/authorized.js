import Vue from 'vue'
import mixin from './base'

const template = `
  <div>
    <div><label for="consumer-key">Consumer Key: </label><input type="text" id="consumer-key" readonly @click.prevent="selectAll" v-model="consumerKey" /></div>
    <div><label for="consumer-secret">Consumer Secret: </label><input type="text" id="consumer-secret" readonly @click.prevent="selectAll"  v-model="consumerSecret" /></div>
    <div><label for="access-token">Access Token: </label><input type="text" id="access-token" readonly @click.prevent="selectAll"  v-model="accessToken" /></div>
    <div><label for="access-token-secret">Access Token Secret: </label><input type="text" id="access-token-secret" readonly @click.prevent="selectAll"  v-model="accessTokenSecret" /></div>
  </div>
`

const checkKeys = ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret']

export default Vue.extend({
  mixins: [mixin],
  template,
  created() {
    if(checkKeys.every(key => this.$route.query[key])) {
      const { consumerKey, consumerSecret, accessToken, accessTokenSecret } = this.$route.query
      this.consumerKey = consumerKey
      this.consumerSecret = consumerSecret
      this.accessToken = accessToken
      this.accessTokenSecret = accessTokenSecret
      this.type = 'callback'
      this.$parent.isCurrent('/authorized')
    }
    if(!this.checkKey() || !this.checkToken()) return
  },
  methods: {
    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    },
    checkToken() {
      return this.accessToken && this.accessTokenSecret
    }
  }
})
