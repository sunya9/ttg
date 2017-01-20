import { mapState } from 'vuex'
import Vue from 'vue'

const template = `
<ol class="progress">
  <li :class="isCurrent('input-key')"><router-link to="/input-key">CK/CS入力</a></li>
  <li v-show="show" :class="isCurrent('authorize')"><router-link to="/authorize">PIN入力</a></li>
  <li :class="isCurrent('authorized')"><router-link to="/authorized">認証完了</a></li>
</ol>`

Vue.component('steps', {
  template,
  computed: mapState({
    show: state => state.type === 'pin'
  }),
  methods: {
    isCurrent(name) {
      return this.$store.state.route.name === name ? 'current' : ''
    }
  }
})