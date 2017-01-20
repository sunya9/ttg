import Vue from 'vue'
import ring from '../img/ring.gif'

const template = `
<span class="spinner">
  <img src="${ring}" width="20" height="20" alt="" />
  <span>処理中です…。</span>
</span>
`

Vue.component('progress-ring', {
  template
})