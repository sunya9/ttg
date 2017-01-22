<template>
  <form @submit.prevent="submit">
    <div>
      <label for="pin" class="label-inline">PIN</label>&nbsp;
      <input type="text" v-model="pin" required maxlength="7" pattern="^\d{7}$" id="pin" style="width: auto">&nbsp;
      <input type="submit" value="トークンを取得" :disabled="disableButton">
    </div>
    <p v-show="error">
      エラーが発生しました。<nuxt-link to="/">1.に戻って</a>Consumer Key, Consumer Secret, 認証タイプを確認してください。
    </p>
  </form>
</template>

<script>
import 'isomorphic-fetch'
import promise from 'es6-promise'
import { generateURL } from '../lib/generateURL'

promise.polyfill()

export default {
  data() {
    return {
      processing: false,
      error: false,
      pin: null
    }
  },
  fetch({ store, redirect, store: { state }}) {
    store.commit('changeType', 'pin')
    const goHome = !state.consumerKey || !state.consumerSecret
    if(goHome) return redirect('/')
  },
  computed: {
    disableButton() {
      return !/^\d{7}$/.test(this.pin) || this.processing
    }
  },
  methods: {
    submit() {
      this.processing = true
      this.promise = fetch(`/get?oauth_verifier=${this.pin}`, {
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
</script>