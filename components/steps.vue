<template>
  <ol>
    <li :class="isCurrent('index')"><router-link to="/">CK/CS入力</a></li>
    <transition name="close">
      <li v-if="show" :class="[isCurrent('pin'), {
        disabled: this.$route.name === 'authorized'
      }]"><router-link to="/pin">PIN入力</a></li>
    </transition>
    <li :class="isCurrent('authorized')"><router-link to="/authorized">認証完了</a></li>
  </ol>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    show: state => state.type === 'pin',
  }),
  methods: {
    isCurrent(name) {
      return this.$route.name === name ? 'current' : ''
    },
  }
}
</script>

<style scoped>
@import '../assets/css/variables.css';


.close-enter-active, .close-leave-active {
  transition: all .5s ease;
  overflow: hidden;
  white-space: nowrap;
}

.close-leave, .close-enter-to {
  opacity: 1;
  max-width: 100%;
}

.close-leave-to, .close-enter {
  max-width: 0;
  opacity: 0;
}

ol {
  display: flex;

  & > li {
    color: var(--color-primary);
    flex: 1;
    border-bottom: 1px solid var(--color-primary);
    & ~ li {
      margin-left: 1rem;
    }
    &.current {
      pointer-events: none;
      border-bottom-color: var(--color-accent);
      position: relative;
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        right: 0;
        bottom: -10px;
        transform-origin: right 1px;
        border: 1px solid transparent;
        border-top-color: inherit;
        border-right-color: inherit;
        transform: rotate(45deg);
      }
      &, & a {
        color: var(--color-accent);
      }
      
    }
    &.current ~ li, &.disabled {
      border-bottom-color: #999;
      &, & a {
        pointer-events: none;
        color: #999;
      }
    }
  }
}
</style>