import { mapState } from 'vuex'
import { generateURL } from './generateURL'

const template = `
  <form @submit.prevent="go">
    <div>
      <label>Consumer Key<input type="text" :value="key" name="consumerKey" @input="updateValue"></label>
    </div>
    <div>
      <label>Consumer Secret<input type="text" :value="secret" name="consumerSecret" @input="updateValue"></label>
    </div>
    <div>
      <label>認証タイプ</label>
      <input type="radio" value="pin" @change="updateValue" name="type" id="type-pin" v-model="type"><label class="label-inline" for="type-pin">PIN</label>
      <input type="radio" value="callback" @change="updateValue" name="type" id="type-callback"  v-model="type"><label class="label-inline" for="type-callback">Callback</label>
    </div>
    <input type="submit" :value="buttonText" :disabled="!key || !secret || !type">
  </form>
`

export default {
  template,
  data() {
    return {
      promise: null
    }
  },
  computed: mapState({
    buttonText: state => state.type === 'callback' ? '認証する' : '認証URL生成',
    key: state => state.consumerKey,
    secret: state => state.consumerSecret,
    type: state => state.type
  }),
  methods: {
    go() {
      if(this.type === 'callback') {
        this.promise = generateURL(this.key, this.secret, this.type)
          .then(url => location.href = url)
          .catch(console.error.bind(console))
      } else {
        this.$router[this.type === 'callback' ? 'replace' : 'push']('/authorize')
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
