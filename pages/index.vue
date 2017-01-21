<template>
  <form @submit.prevent="go">
    <label for="ck">Consumer Key</label>
    <input type="text" id="ck" :value="key" name="consumerKey" @input="updateValue" size="60">

    <label for="cs">Consumer Secret</label>
    <input type="text" id="cs" :value="secret" name="consumerSecret" @input="updateValue" size="60">

    <label>認証タイプ</label>
    <label class="label-inline" for="type-pin"><input type="radio" value="pin" @change="updateType" name="type" id="type-pin" v-model="type">PIN</label>
    <label class="label-inline" for="type-callback"><input type="radio" value="callback" @change="updateType" name="type" id="type-callback"  v-model="type">Callback</label>

    <div>
      <input type="submit" value="認証する" :disabled="(!key || !secret || !type)">
    </div>
    <p v-if="error">{{error.message}}</p>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { generateURL } from '../lib/generateURL'

export default {
  data() {
    return {
      error: null
    }
  },
  computed: mapState({
    key: state => state.consumerKey,
    secret: state => state.consumerSecret,
    type: state => state.type,
  }),
  methods: {
    go() {
      this.error = null
      let wnd
      if(this.type === 'pin')
        wnd = window.open('', 'ttg', 'resizable=yes,scrollbars=yes')
      generateURL(this.key, this.secret, this.type)
        .then(url => {
          if(this.type === 'callback') {
            location.href = url
          } else {
            wnd.location.href = url
            this.$router.push('/pin')              
          }
        })
        .catch(err => this.error = err)
    },
    updateType({ target: { value } }) {
      this.$store.commit('changeType', value)
    },
    updateValue(e) {
      const {target: {name, value}} = e
      this.$store.commit('updateValue', {
        name,
        value
      })
    }
  }
}
</script>
