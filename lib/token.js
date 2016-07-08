const qs = require('qs')
const { twitter } = require('./twitter-oauth')

module.exports = function* (){

  const { consumer_key, consumer_secret, type } = qs.parse(this.querystring)
  const invalidParams = !consumer_key || !consumer_secret || !type
  if(invalidParams) {
    this.throw(400, 'Invalid parameters.')
  }

  const client = twitter(consumer_key, consumer_secret, type === 'callback' ? `${this.origin}/get` : null)
  const res = yield new Promise((resolve, reject) => {
    client.getOAuthRequestToken((err, oauthToken, oauthTokenSecret) => {
      if(err) reject(err)
      const res = {
        oauthToken,
        oauthTokenSecret,
        url: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
      }
      resolve(res)
    })
  })
  const { oauthToken, oauthTokenSecret, url } = res
  this.session = {
    consumerKey: consumer_key,
    consumerSecret: consumer_secret,
    oauthToken,
    oauthTokenSecret
  }
  this.body = { url }
}
