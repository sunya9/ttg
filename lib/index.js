const getToken = require('./get')

module.exports = function* () {
  const defaultOutputKeys = ['consumerKey', 'consumerSecret', 'accessToken', 'accessTokenSecret']
  const defaultOutputObj = {}
  defaultOutputKeys.forEach(key => defaultOutputObj[key] = null)
  // token would be null if oauth_verifier does not exist in querystring
  const tokens = yield getToken.bind(this)()
  const callbackRequest = tokens && tokens.type === 'callback' && Object.keys(tokens).every(key => tokens[key])
  const pinRequest = tokens && tokens.type === 'pin'
  // If each tokens exist, store in session(first).
  if(callbackRequest) {
    // exist each tokens
    this.session = tokens
    this.redirect('/#!/authorized')
  } else if(pinRequest) {
    this.body = tokens
    this.session = null
  } else {
    // If tokens does not exsit(second and default).
    const outputTokens = Object.assign({}, defaultOutputObj, defaultOutputKeys.reduce((res, key) => {
      res[key] = (this.session && this.session[key])
      return res
    }, {}))
    yield this.render('index', outputTokens)
    this.session = null
  }
}
