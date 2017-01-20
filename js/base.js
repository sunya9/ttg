export default {
  updated() {
    const goTop = !this.$store.state.consumerKey || !this.$store.state.consumerSecret || !this.$store.state.type
    if(goTop) this.$router.replace('/')
  }
}
