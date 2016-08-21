import Vue from 'vue'
import mixin from './base'

const template = `
  <form @submit.prevent="go">
    <div>
      <label>Consumer Key: <input type="text" v-model="consumerKey"></label>
    </div>
    <div>
      <label>Consumer Secret: <input type="text" v-model="consumerSecret"></label>
    </div>
    <div>
      <label>認証タイプ:</label>
      <input type="radio" value="pin" v-model="type" id="type-pin"><label class="label-inline" for="type-pin">PIN</label>
      <input type="radio" value="callback" v-model="type" id="type-callback"><label class="label-inline" for="type-callback">Callback</label>
    </div>
    <input type="submit" :value="buttonText" :disabled="!(consumerKey && consumerSecret && type)">
  </form>
`

module.exports = Vue.extend({
  mixins: [mixin],
  template,
  computed: {
    buttonText() {
      return this.type === 'callback' ? '認証する' : '認証URL生成'
    }
  },
  methods: {
    go() {
      this.$router[this.type === 'callback' ? 'replace' : 'go']('/authorize')
    }
  }
})
