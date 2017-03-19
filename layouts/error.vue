<template>
  <div>
    <h1>{{title}}</h1>
    <nuxt-link to="/" class="button button-outline">Home</nuxt-link>
  </div>
</template>

<script>
const CLIENT_ERROR = 4
const SERVER_ERROR = 5
export default {
  propr: ['error'],
  computed: {
    title() {
      const statusCode = !this.error ? 400 : this.error
      const errorType = Math.floor(statusCode / 100)
      const clientError = errorType === CLIENT_ERROR
      const serverError = errorType === SERVER_ERROR
      switch(statusCode) {
        case 401:
          return 'Unauthorized'
        case 404:
        default:
          return serverError
            ? 'Server error'
            : 'Not found'

      }
    }
  }
}
</script>