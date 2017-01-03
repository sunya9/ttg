export default {
  props: ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret', 'type'],

  methods: {
    checkKey() {
      const res = this.consumerKey && this.consumerSecret
      if(!res) {
        this.$router.replace('/')
      }
      return res
    }
  }
}
