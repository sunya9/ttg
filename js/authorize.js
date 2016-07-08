import Vue from 'vue'
import promise from 'es6-promise'
promise.polyfill()
import 'isomorphic-fetch'

import mixin from './base'
import { generateURL } from './generateURL'

const template = `
<div>
  <div v-show="authorizationURL">
    <button @click="open">PINを取得</button>
    <form v-show="showForm" @submit.prevent="submit">
      <div>
        <label for="pin">PIN: </label>
        <input type="text" v-model="pin" required maxlength="7" pattern="^\\d{7}$" id="pin" />
      </div>
      <div>
        <input type="submit" value="トークンを取得" :disabled="disableButton" />
      </div>
      <p v-show="promise"><partial name="progress" /></p>
    </form>
  </div>
  <div v-else>
    <p>
      <partial name="progress" />
    </p>
  </div>
</div>
`

module.exports = Vue.extend({
  mixins: [mixin],
  template,
  data() {
    return {
      showForm: false,
      promise: null,
      authorizationURL: null,
      pin: null
    }
  },
  created() {
    if(!this.checkKey()) return
    this.generateOAuthURL().then(url => {
        if(this.type === 'callback') {
          location.href = url
        } else {
          this.authorizationURL = url
        }
      })
  },
  computed: {
    disableButton() {
      return !/^\d{7}$/.test(this.pin) || this.promise
    }
  },
  methods: {
    generateOAuthURL() {
      return generateURL(this.consumerKey, this.consumerSecret, this.type)
    },
    open() {
      window.open(this.authorizationURL, 'ttg', 'resizable=yes,scrollbars=yes')
      this.showForm = true
    },
    submit() {
      this.promise = fetch(`/get?oauth_verifier=${this.pin}`, {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'fetch'
        }
      })
        .then(body => body.json())
        .then(data => {
          const {
            accessToken,
            accessTokenSecret
          } = data
          this.accessToken = accessToken
          this.accessTokenSecret = accessTokenSecret
          this.$router.go('/authorized')
          this.promise = null
        })
        .then(() => this.generateOAuthURL())

    }
  }
})
