export const state = () => ({
  consumerKey: null,
  consumerSecret: null,
  type: null,
  accessToken: null,
  accessTokenSecret: null
})

export const mutations = {
  updateValue(state, {
    name,
    value
  }) {
    state[name] = value
  },
  changeType(state, type) {
    state.type = type
  }
}
