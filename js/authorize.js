import promise from 'es6-promise'
import { generateURL } from './generateURL'

import mixin from './base'

promise.polyfill()

const template = `
<form @submit.prevent="submit">
  <div>
    <label for="pin">PIN: </label>
    <input type="text" v-model="pin" required maxlength="7" pattern="^\\d{7}$" id="pin" style="width: auto">
    <input type="submit" value="トークンを取得" :disabled="disableButton">
    <progress-ring v-show="processing">
  </div>
  <p v-show="error">
    エラーが発生しました。<router-link to="/input-key">1.に戻って</a>Consumer Key, Consumer Secret, 認証タイプを確認してください。
  </p>
</form>
`

export default {
  mixins: [mixin],
  template,
  data() {
    return {
      processing: false,
      error: false,
      pin: null
    }
  },
  computed: {
    disableButton() {
      return !/^\d{7}$/.test(this.pin) || this.processing
    }
  },
  mounted() {
    this.processing = false
    const wnd = window.open(this.authorizationURL, 'ttg', 'resizable=yes,scrollbars=yes')
    generateURL(this.$store.state.consumerKey, this.$store.state.consumerSecret, this.$store.state.type)
      .then(url => wnd.location.href = url)
  },
  methods: {
    submit() {
      this.processing = true
      this.promise = fetch(`/?oauth_verifier=${this.pin}`, {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'fetch'
        }
      })
        .then(res => {
          if(!res.ok) throw Error(res.responseText)
          return res
        })
        .then(body => body.json())
        .then(data => {
          const {
            accessToken,
            accessTokenSecret
          } = data
          this.$store.commit('updateValue', {
            name: 'accessToken',
            value: accessToken
          })
          this.$store.commit('updateValue', {
            name: 'accessTokenSecret',
            value: accessTokenSecret
          })
          this.processing = false
          this.$router.push('/authorized')
        })
        .catch(err => this.error = err)
    }
  }
}