import { mapState } from 'vuex'
import { generateURL } from './generateURL'

const template = `
  <form @submit.prevent="go">
    <label for="ck">Consumer Key</label>
    <input type="text" id="ck" :value="key" name="consumerKey" @input="updateValue" size="60">

    <label for="cs">Consumer Secret</label>
    <input type="text" id="cs" :value="secret" name="consumerSecret" @input="updateValue" size="60">

    <label>認証タイプ</label>
    <input type="radio" value="pin" @change="updateValue" name="type" id="type-pin" v-model="type"><label class="label-inline" for="type-pin">PIN</label>
    <input type="radio" value="callback" @change="updateValue" name="type" id="type-callback"  v-model="type"><label class="label-inline" for="type-callback">Callback</label>

    <div>
      <input type="submit" value="認証する" :disabled="!key || !secret || !type">
    </div>
    <p v-if="error">{{error.message}}</p>
  </form>
`

export default {
  template,
  data() {
    return {
      error: null
    }
  },
  computed: mapState({
    key: state => state.consumerKey,
    secret: state => state.consumerSecret,
    type: state => state.type
  }),
  methods: {
    go() {
      this.error = null
      if(this.type === 'callback') {
        generateURL(this.key, this.secret, this.type)
          .then(url => location.href = url)
          .catch(err => this.error = err)
      } else {
        this.$router.push('/authorize')
      }
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
