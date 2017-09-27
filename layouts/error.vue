<template>
  <div class="container">
    <h1>{{error.statusCode}}</h1>
    <p>{{error.message}}</p>
    <nuxt-link to="/" class="button button-outline">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return {
      title: `${this.error.statusCode}: ${this.error.message}`
    }
  }
}
</script>