<template>
  <div>
    <form @submit.prevent="generate">
      <label for="ck">Consumer Key</label>
      <input type="text" id="ck" :value="key" name="consumerKey" @input="updateValue" size="60">

      <label for="cs">Consumer Secret</label>
      <input type="text" id="cs" :value="secret" name="consumerSecret" @input="updateValue" size="60">

      <label>認証タイプ</label>
      <label class="label-inline" for="type-pin"><input type="radio" value="pin" name="type" id="type-pin" v-model="type">PIN</label>
      <label class="label-inline" for="type-callback"><input type="radio" value="callback" name="type" id="type-callback" v-model="type">Callback</label>

      <div>
        <input type="submit" value="認証する" :disabled="(!key || !secret || !type)">
      </div>
    </form>
    <form v-show="showPIN" @submit.prevent="submitPIN">
      <label for="pin" class="label-inline">PIN</label>&nbsp;
      <input type="text" v-model="pin" required maxlength="7" pattern="^\d{7}$" id="pin" style="width: auto">&nbsp;
      <input type="submit" value="トークンを取得" :disabled="disabledSubmitPINButton">
    </form>
    <p v-if="error" class="error">{{error.message}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { generateURL } from '../lib/generateURL'

export default {
  data() {
    return {
      error: null,
      showPIN: false,
      processing: false,
      pin: null
    }
  },
  computed: {
    disabledGenerateButton() {
      return !this.key || !this.secret || !this.type
    },
    disabledSubmitPINButton() {
      return !/^\d{7}$/.test(this.pin) || this.processing
    },
    ...mapState({
      key: state => state.consumerKey,
      secret: state => state.consumerSecret,
    }),
    type: {
      get() {
        return this.$store.state.type
      },
      set(type) {
        return this.$store.commit('changeType', type)
      }
    }
  },
  methods: {
    generate() {
      this.error = null
      let wnd
      if (this.type === 'pin')
        wnd = window.open('', 'ttg', 'resizable=yes,scrollbars=yes')
      generateURL(this.key, this.secret, this.type)
        .then(url => {
          if (this.type === 'callback') {
            location.href = url
          } else {
            wnd.location.href = url
            this.showPIN = true
          }
        })
        .catch(err => {
          console.error(err)
          this.error = err
          if (wnd) {
            wnd.close()
          }
        })
    },
    updateType({ target: { value } }) {
      this.$store.commit('changeType', value)
    },
    updateValue(e) {
      const { target: { name, value } } = e
      this.$store.commit('updateValue', {
        name,
        value
      })
    },
    submitPIN() {
      this.processing = true
      this.promise = fetch(`/get?oauth_verifier=${this.pin}`, {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'fetch'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(res.responseText)
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

<style>
.error {
  background-color: #F2A0A3;
  line-height: 1.5;
  padding: 1rem;
  border: 1px solid #F28084;
}
</style>