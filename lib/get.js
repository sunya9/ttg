const qs = require('querystring')
const { twitter } = require('./twitter-oauth')

module.exports = function* () {
  const { oauth_verifier } = qs.parse(this.querystring)
  const {consumerKey, consumerSecret, oauthToken, oauthTokenSecret } = this.session
  const timeout = !consumerKey || !consumerSecret || !oauthToken || !oauthTokenSecret
  if(timeout) {
    this.throw(400, 'Session timeout.')
  }
  const client = twitter(consumerKey, consumerSecret)
  try {
    const res = yield new Promise((resolve, reject) => {
      client.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauth_verifier, (err, accessToken, accessTokenSecret) => {
        if(err) reject(err)
        resolve({
          accessToken,
          accessTokenSecret
        })
      })
    })
    const xhr = this.request.get('X-Requested-With') === 'fetch'
    if(xhr) {
      this.body = res
    } else {
      const query = Object.assign({}, res, { consumerKey, consumerSecret })
      this.status = 303
      this.redirect(`/#!/authorized?${qs.stringify(query)}`)
    }
  } catch(e) {
    this.throw(400, e)
  }
}
