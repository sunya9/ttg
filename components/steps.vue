<template>
  <ol>
    <li :class="isCurrent('index')"><router-link to="/">CK/CS入力</router-link></li>
    <li :class="isCurrent('authorized')"><router-link to="/authorized">認証完了</router-link></li>
  </ol>
</template>

<script>
export default {
  methods: {
    isCurrent(name) {
      return this.$route.name === name ? 'current' : ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/variables';

ol {
  display: flex;

  & > li {
    color: $color-primary;
    flex: 1;
    border-bottom: 1px solid $color-primary;
    & ~ li {
      margin-left: 1rem;
    }
    &.current {
      pointer-events: none;
      border-bottom-color: $color-accent;
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
        color: $color-accent;
      }
      
    }
    &.current ~ li {
      border-bottom-color: #999;
      &, & a {
        pointer-events: none;
        color: #999;
      }
    }
  }
}
</style>